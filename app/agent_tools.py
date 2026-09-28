import json

from copilot import define_tool
from pydantic import BaseModel, EmailStr, Field

from app.catalog import MENU, OrderLine, calculate_order
from app.config import get_settings
from app.emailer import send_order_email
from app.orders import order_store


class CalculateOrderParams(BaseModel):
    items: list[OrderLine] = Field(description="商品 ID 与数量")


class CreateOrderParams(BaseModel):
    session_id: str = Field(description="当前网站会话 ID")
    customer_name: str = Field(min_length=1, max_length=80)
    items: list[OrderLine]
    confirmed: bool = Field(description="客户是否已明确确认价格与品项")


class SendEmailParams(BaseModel):
    order_id: str
    recipient: EmailStr


@define_tool(
    name="get_menu",
    description="获取当前可点购的模拟餐点、商品 ID 与价格",
    skip_permission=True,
)
def get_menu() -> str:
    return json.dumps([item.model_dump() for item in MENU], ensure_ascii=False)


@define_tool(
    name="calculate_order",
    description="按商品 ID 与数量计算订单明细、服务费与总价，不会建立订单",
    skip_permission=True,
)
def calculate_order_tool(params: CalculateOrderParams) -> str:
    return json.dumps(calculate_order(params.items), ensure_ascii=False)


@define_tool(
    name="create_order",
    description="只在客户明确确认后建立模拟订单；未确认时必须拒绝",
)
def create_order_tool(params: CreateOrderParams) -> str:
    if not params.confirmed:
        raise ValueError("客户尚未明确确认，订单未建立")
    order = order_store.create(params.session_id, params.customer_name, params.items)
    return json.dumps(order, ensure_ascii=False)


@define_tool(
    name="send_order_email",
    description="将已建立订单的确认信发送至客户 email；本机默认输出至 console",
)
async def send_order_email_tool(params: SendEmailParams) -> str:
    order = order_store.get(params.order_id)
    if order is None:
        raise ValueError(f"找不到订单：{params.order_id}")
    result = await send_order_email(get_settings(), order, str(params.recipient))
    return json.dumps(result, ensure_ascii=False)


ORDER_TOOLS = [get_menu, calculate_order_tool, create_order_tool, send_order_email_tool]
