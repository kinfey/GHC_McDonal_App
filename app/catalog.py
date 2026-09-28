from decimal import Decimal

from pydantic import BaseModel, Field


class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    category: str
    price_cents: int
    emoji: str
    accent: str


class OrderLine(BaseModel):
    item_id: str
    quantity: int = Field(ge=1, le=20)


MENU = (
    MenuItem(
        id="big-mac",
        name="经典双层牛肉堡",
        description="双层牛肉、酸黄瓜、爽脆生菜与经典酱汁",
        category="汉堡",
        price_cents=4500,
        emoji="🍔",
        accent="#d62828",
    ),
    MenuItem(
        id="mc-chicken",
        name="黄金脆鸡堡",
        description="酥脆鸡排、清爽生菜与顺滑蛋黄酱",
        category="汉堡",
        price_cents=3900,
        emoji="🍗",
        accent="#f5a623",
    ),
    MenuItem(
        id="nuggets-6",
        name="麦乐鸡 6 块",
        description="外酥里嫩，附一款自选酱料",
        category="小食",
        price_cents=3200,
        emoji="✨",
        accent="#ffbc0d",
    ),
    MenuItem(
        id="fries",
        name="经典薯条",
        description="金黄酥脆，中份",
        category="小食",
        price_cents=1800,
        emoji="🍟",
        accent="#e63946",
    ),
    MenuItem(
        id="apple-pie",
        name="香芋派",
        description="香甜馅料与酥脆外皮",
        category="甜点",
        price_cents=1500,
        emoji="🥧",
        accent="#8d5524",
    ),
    MenuItem(
        id="cola",
        name="冰爽可乐",
        description="清凉气泡饮，中杯",
        category="饮品",
        price_cents=1200,
        emoji="🥤",
        accent="#7a0019",
    ),
)

MENU_BY_ID = {item.id: item for item in MENU}


def calculate_order(lines: list[OrderLine]) -> dict:
    if not lines:
        raise ValueError("购物车不能为空")

    normalized: list[dict] = []
    subtotal = 0
    for line in lines:
        item = MENU_BY_ID.get(line.item_id)
        if item is None:
            raise ValueError(f"找不到商品：{line.item_id}")
        line_total = item.price_cents * line.quantity
        subtotal += line_total
        normalized.append(
            {
                "item_id": item.id,
                "name": item.name,
                "quantity": line.quantity,
                "unit_price_cents": item.price_cents,
                "line_total_cents": line_total,
            }
        )

    service_fee = 0 if subtotal >= 6000 else 500
    return {
        "lines": normalized,
        "subtotal_cents": subtotal,
        "service_fee_cents": service_fee,
        "total_cents": subtotal + service_fee,
        "currency": "CNY",
        "total_display": f"¥{Decimal(subtotal + service_fee) / 100:.2f}",
    }
