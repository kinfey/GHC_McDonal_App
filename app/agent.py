import asyncio
import json
from pathlib import Path

from copilot import CopilotClient, ToolSet
from copilot.session import PermissionHandler
from copilot.session_events import AssistantMessageData, McpServerStatus

from app.agent_tools import ORDER_TOOLS
from app.config import Settings

SYSTEM_MESSAGE = """
你是 Golden Order Copilot，一位支持简体中文、繁體中文和 English 的麦当劳风格模拟点餐专员。
每轮必须使用应用提供的当前语言，不得因用户消息使用其他语言而忽略当前语言设置。

业务流程必须遵守：
1. 用户可以直接聊天、查询菜单或优惠券，不需要先选择套餐。
2. 使用 get_menu 核对商品，不可虚构商品 ID 或价格。所有价格均以人民币结算，
   price_cents、subtotal_cents、service_fee_cents 与 total_cents 的单位是人民币分，
   对用户展示时必须使用人民币符号 ¥，不可使用 NT$、美元或其他币种。
3. 页面购物车是模拟推荐菜单，不代表官方门店一定在售。收到购物车上下文后：
   - 先确认用户选择到店自取、得来速还是外送，以及城市和位置关键词。
   - 到店自取或得来速调用 mcd-mcp-query-nearby-stores；外送调用
     mcd-mcp-delivery-query-stores。
   - 用户选择门店后调用 mcd-mcp-query-meals，核对所选餐点在该门店是否在售并获取
     官方 productCode；需要查看组成时调用 mcd-mcp-query-meal-detail。
   - 需要门店可用券时调用 mcd-mcp-query-store-coupons；需要正式价格时调用
     mcd-mcp-calculate-price。
   - 缺少工具必填参数时先询问，不可猜测城市、位置、门店编码、业务编码或商品编码。
4. 仅在用户明确要求模拟核价时，使用 calculate_order 计算模拟品项、服务费与总价。
5. 建立模拟订单前，必须取得客户对品项与总价的明确确认。未确认不得调用 create_order。
6. 建立成功后，只有客户提供 email 时才调用 send_order_email。
7. 用户询问“今天有什么优惠券”“可以领什么券”时，必须调用
   mcd-mcp-available-coupons；询问自己已拥有的券时调用 mcd-mcp-query-my-coupons；
   询问本月活动时调用 mcd-mcp-campaign-calendar。不得仅凭模型知识回答。
8. 官方 mcd-mcp 在本应用中只开放查询工具；不要创建或取消真实订单，不要自动领券。
9. 不得输出 API key、密码、token 或其他环境变量秘密。
10. 回复简洁、友善，并明确指出这是模拟点餐，并非麦当劳官方服务。
"""


class OrderingAgent:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.client: CopilotClient | None = None
        self.sessions: dict[str, object] = {}
        self._session_locks: dict[str, asyncio.Lock] = {}
        self._create_lock = asyncio.Lock()

    async def start(self) -> None:
        self.client = CopilotClient(
            working_directory=str(Path.cwd()),
            base_directory=str(Path.cwd() / ".copilot-state"),
            mode="empty",
        )
        await self.client.start()

    async def stop(self) -> None:
        for session in self.sessions.values():
            await session.disconnect()
        self.sessions.clear()
        if self.client is not None:
            await self.client.stop()
            self.client = None

    async def _get_session(self, session_id: str):
        if session_id in self.sessions:
            return self.sessions[session_id]
        async with self._create_lock:
            if session_id in self.sessions:
                return self.sessions[session_id]
            if self.client is None:
                raise RuntimeError("Copilot client 尚未启动")

            if not self.settings.mcd_mcp_token:
                raise RuntimeError("MCD_MCP_TOKEN 尚未配置")
            mcp_servers = {
                "mcd-mcp": {
                    "type": "http",
                    "url": self.settings.mcd_mcp_url,
                    "headers": {
                        "Authorization": f"Bearer {self.settings.mcd_mcp_token}",
                    },
                    "tools": [
                        "available-coupons",
                        "query-my-coupons",
                        "campaign-calendar",
                        "query-my-account",
                        "query-nearby-stores",
                        "delivery-query-stores",
                        "query-meals",
                        "query-meal-detail",
                        "query-store-coupons",
                        "calculate-price",
                    ],
                }
            }
            available_tools = ToolSet()
            for tool in (
                "get_menu",
                "calculate_order",
                "create_order",
                "send_order_email",
            ):
                available_tools.add_custom(tool)
            for tool in (
                "mcd-mcp-available-coupons",
                "mcd-mcp-query-my-coupons",
                "mcd-mcp-campaign-calendar",
                "mcd-mcp-query-my-account",
                "mcd-mcp-query-nearby-stores",
                "mcd-mcp-delivery-query-stores",
                "mcd-mcp-query-meals",
                "mcd-mcp-query-meal-detail",
                "mcd-mcp-query-store-coupons",
                "mcd-mcp-calculate-price",
            ):
                available_tools.add_mcp(tool)
            session = await self.client.create_session(
                model=self.settings.copilot_model,
                reasoning_effort=self.settings.copilot_reasoning_effort,
                on_permission_request=PermissionHandler.approve_all,
                system_message={"mode": "replace", "content": SYSTEM_MESSAGE},
                tools=ORDER_TOOLS,
                mcp_servers=mcp_servers,
                available_tools=available_tools,
                large_output={
                    "enabled": True,
                    "max_size_bytes": 2_000_000,
                    "output_directory": str(Path.cwd() / ".copilot-state" / "large-output"),
                },
            )
            await self._wait_for_mcp(session, "mcd-mcp")
            self.sessions[session_id] = session
            self._session_locks[session_id] = asyncio.Lock()
            return session

    async def _wait_for_mcp(self, session, server_name: str) -> None:
        deadline = asyncio.get_running_loop().time() + 20
        last_status = "not listed"
        while asyncio.get_running_loop().time() < deadline:
            result = await session.rpc.mcp.list()
            server = next((item for item in result.servers if item.name == server_name), None)
            if server is not None:
                last_status = str(server.status)
                if server.status == McpServerStatus.CONNECTED:
                    return
            await asyncio.sleep(0.2)
        await session.disconnect()
        raise RuntimeError(f"MCP 服务 {server_name} 连接超时，最后状态：{last_status}")

    async def chat(
        self,
        session_id: str,
        message: str,
        cart: list[dict] | None = None,
        locale: str = "zh-CN",
    ) -> str:
        session = await self._get_session(session_id)
        lock = self._session_locks[session_id]
        coupon_terms = ("优惠券", "優惠券", "优惠", "優惠", "券", "活动", "活動")
        routing_instruction = ""
        if any(term in message for term in coupon_terms):
            routing_instruction = (
                "\n系统路由要求：这是优惠相关问题。回答前必须调用 "
                "mcd-mcp-available-coupons 官方 MCP 工具，并依据工具返回的真实数据回答。"
            )
        cart_context = ""
        if cart:
            cart_context = (
                "\n页面当前购物车（仅作为用户选择意图，不代表官方在售或官方价格）："
                f"{json.dumps(cart, ensure_ascii=False)}"
            )
        language_names = {
            "zh-CN": "简体中文",
            "zh-TW": "繁體中文",
            "en": "English",
        }
        language_instruction = (
            f"应用语言设置：{language_names.get(locale, '简体中文')}。"
            f"本轮以及所有工具结果的说明必须使用{language_names.get(locale, '简体中文')}。"
            "工具返回的专有名称可保留原文，并在需要时附翻译。"
        )
        async with lock:
            await session.send(language_instruction, source="system")
            reply = await session.send_and_wait(
                f"网站会话 ID：{session_id}\n客户消息：{message}"
                f"{cart_context}{routing_instruction}",
                timeout=120,
            )
        if reply is None or not isinstance(reply.data, AssistantMessageData):
            raise RuntimeError("Copilot 未返回可显示的消息")
        return reply.data.content
