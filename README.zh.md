# Golden Order Copilot

[English](README.md)

Golden Order Copilot 是一个麦当劳风格的非官方模拟点餐应用，使用
**GitHub Copilot Python SDK**、`gpt-6-astra`、自定义工具和麦当劳中国官方 MCP 服务。

应用支持简体中文、繁体中文和英文。用户无需先选择套餐即可聊天，也可以浏览模拟菜单、
查询官方 MCP 数据、添加购物车、确认模拟订单并生成或发送订单确认邮件。

> 本项目仅用于技术演示，与 McDonald's Corporation 及其关联企业无隶属、授权或合作关系。

## 主要功能

- GitHub Copilot Python SDK 会话编排
- 可配置的 `gpt-6-astra` 模型和 reasoning effort
- 麦当劳中国官方 Streamable HTTP MCP
- 基于 MCP 的门店、餐品、优惠券、活动、积分和价格查询
- 模拟菜单、核价、创建订单及邮件发送自定义 tools
- 创建模拟订单前必须由用户明确确认
- 安全渲染 Markdown 表格、列表、链接、强调和代码
- 适配手机及桌面浏览器
- 简体中文、繁体中文和英文即时切换
- 所有凭据和运行参数保存在 `.env`

## 系统架构

```text
浏览器
├── 响应式菜单与购物车
├── 语言切换器
├── Markdown 聊天渲染器
└── POST /api/chat
        │
        ▼
FastAPI 应用
├── 请求参数验证
├── 购物车与语言上下文
└── OrderingAgent
        │
        ▼
GitHub Copilot Python SDK
├── 模型：gpt-6-astra
├── 点餐业务系统提示
├── 应用自定义工具
│   ├── get_menu
│   ├── calculate_order
│   ├── create_order
│   └── send_order_email
└── 麦当劳中国官方 MCP 工具
    ├── available-coupons
    ├── query-my-coupons
    ├── campaign-calendar
    ├── query-my-account
    ├── query-nearby-stores
    ├── delivery-query-stores
    ├── query-meals
    ├── query-meal-detail
    ├── query-store-coupons
    └── calculate-price
        │
        ▼
https://mcp.mcd.cn
```

## 项目结构

```text
GHC_McDonal_App/
├── app/
│   ├── __init__.py
│   ├── agent.py          # Copilot SDK 会话、工具、MCP 路由和语言上下文
│   ├── agent_tools.py    # 模拟订单与邮件自定义工具
│   ├── catalog.py        # 模拟菜单和人民币价格计算
│   ├── config.py         # 类型化 .env 配置
│   ├── emailer.py        # Console 预览与 SMTP 投递
│   ├── main.py           # FastAPI 路由和生命周期
│   ├── orders.py         # 内存模拟订单存储
│   └── static/
│       ├── app.js        # UI 状态、国际化、聊天、购物车和 Markdown 渲染
│       ├── index.html    # 单页应用结构
│       └── styles.css    # 响应式麦当劳风格界面
├── tests/
│   └── test_catalog.py
├── .env.example
├── .gitignore
├── pyproject.toml
├── README.md
└── README.zh.md
```

## Copilot SDK 业务流

1. FastAPI 在隔离的 `empty` 模式下启动一个 `CopilotClient`。
2. 每个浏览器会话使用独立的 Copilot 对话。
3. 每次请求都会传递当前语言和购物车上下文。
4. 自定义 tools 只处理本地模拟订单流程。
5. 门店、餐品和优惠等业务查询由官方 MCP 完成。
6. 调用依赖门店的工具前，Agent 会先收集取餐方式、城市、位置和门店。
7. `query-meals` 返回的官方商品编码不会被页面模拟商品 ID 替代。
8. 只有用户明确确认品项与总价后才创建模拟订单。

## 官方 MCP 配置

项目遵循麦当劳中国 MCP 文档：

- 地址：`https://mcp.mcd.cn`
- 传输协议：Streamable HTTP
- 鉴权：`Authorization: Bearer <MCP_TOKEN>`

Agent 只开放只读 MCP 工具，不开放真实下单、取消订单或自动领券能力。

## 环境要求

- Python 3.11 或更高版本
- 已登录并具有权限的 GitHub Copilot 环境
- 麦当劳中国 MCP Token
- 如需真实发送邮件，还需要 SMTP 凭据

## 安装

```bash
python -m venv .venv
source .venv/bin/activate
pip install --index-url https://packagefeedproxy.microsoft.io/pypi/simple -e ".[dev]"
python -m copilot download-runtime
cp .env.example .env
```

配置 `.env`：

```dotenv
COPILOT_MODEL=gpt-6-astra
COPILOT_REASONING_EFFORT=high

MCD_MCP_URL=https://mcp.mcd.cn
MCD_MCP_TOKEN=your_mcp_token

EMAIL_MODE=console
SMTP_HOST=
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=no-reply@example.com
SMTP_USE_TLS=true
```

请勿提交 `.env`，也不要公开 MCP Token 或 SMTP 密码。

## 启动

```bash
source .venv/bin/activate
uvicorn app.main:app --reload
```

访问 <http://127.0.0.1:8000>。

如果 8000 端口已被占用：

```bash
uvicorn app.main:app --reload --port 8765
```

## 邮件模式

| 模式 | 行为 |
|---|---|
| `console` | 在服务端控制台输出安全的邮件预览 |
| `smtp` | 通过配置的 SMTP 服务真实发送邮件 |

QQ 邮箱必须使用 SMTP 授权码，不能使用账号登录密码。

## 验证

```bash
node --check app/static/app.js
ruff check .
pytest
```

## 安全说明

- `.env` 已被 Git 忽略。
- MCP 和 SMTP 凭据不会发送至浏览器。
- MCP Token 仅添加到服务端 Streamable HTTP 连接。
- Agent Markdown 在格式化前会进行 HTML 转义。
- 官方 MCP 仅开放只读查询工具。
- 页面模拟商品 ID 不会被当作麦当劳官方商品编码。

