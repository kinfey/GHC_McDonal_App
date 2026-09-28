import asyncio
import smtplib
from email.message import EmailMessage

from app.config import Settings


def _render_order(order: dict) -> str:
    lines = "\n".join(
        f"- {line['name']} x {line['quantity']}：¥{line['line_total_cents'] / 100:.2f}"
        for line in order["lines"]
    )
    return (
        f"{order['customer_name']}，您好！\n\n"
        f"您的模拟订单 {order['order_id']} 已确认：\n{lines}\n\n"
        f"合计：{order['total_display']}\n"
        "感謝使用 Golden Order Copilot。"
    )


async def send_order_email(settings: Settings, order: dict, recipient: str) -> dict:
    body = _render_order(order)
    if settings.email_mode == "console":
        print(f"\n--- EMAIL PREVIEW TO {recipient} ---\n{body}\n--- END EMAIL ---\n")
        return {"status": "previewed", "recipient": recipient}

    if settings.email_mode != "smtp":
        raise ValueError("EMAIL_MODE 必须是 console 或 smtp")
    if not settings.smtp_host:
        raise RuntimeError("SMTP_HOST 尚未设置，无法发送 email")

    message = EmailMessage()
    message["Subject"] = f"订单确认｜{order['order_id']}"
    message["From"] = settings.smtp_from_email
    message["To"] = recipient
    message.set_content(body)

    def _send() -> None:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(message)

    await asyncio.to_thread(_send)
    return {"status": "sent", "recipient": recipient}
