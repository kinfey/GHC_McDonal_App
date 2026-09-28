import pytest

from app.catalog import OrderLine, calculate_order


def test_calculate_order_adds_service_fee_below_threshold() -> None:
    result = calculate_order([OrderLine(item_id="big-mac", quantity=1)])

    assert result["subtotal_cents"] == 4500
    assert result["service_fee_cents"] == 500
    assert result["total_cents"] == 5000
    assert result["currency"] == "CNY"
    assert result["total_display"] == "¥50.00"


def test_calculate_order_waives_service_fee_at_threshold() -> None:
    result = calculate_order([OrderLine(item_id="nuggets-6", quantity=2)])

    assert result["subtotal_cents"] == 6400
    assert result["service_fee_cents"] == 0


def test_calculate_order_rejects_unknown_item() -> None:
    with pytest.raises(ValueError, match="找不到商品"):
        calculate_order([OrderLine(item_id="not-real", quantity=1)])
