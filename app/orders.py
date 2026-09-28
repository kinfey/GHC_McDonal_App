from datetime import UTC, datetime
from threading import Lock
from uuid import uuid4

from app.catalog import OrderLine, calculate_order


class OrderStore:
    def __init__(self) -> None:
        self._orders: dict[str, dict] = {}
        self._lock = Lock()

    def create(self, session_id: str, customer_name: str, lines: list[OrderLine]) -> dict:
        summary = calculate_order(lines)
        order_id = f"GO-{uuid4().hex[:8].upper()}"
        order = {
            "order_id": order_id,
            "session_id": session_id,
            "customer_name": customer_name,
            "status": "confirmed",
            "created_at": datetime.now(UTC).isoformat(),
            **summary,
        }
        with self._lock:
            self._orders[order_id] = order
        return order

    def get(self, order_id: str) -> dict | None:
        with self._lock:
            return self._orders.get(order_id)


order_store = OrderStore()

