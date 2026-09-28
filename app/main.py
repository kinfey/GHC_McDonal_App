from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from app.agent import OrderingAgent
from app.catalog import MENU, OrderLine
from app.config import get_settings

STATIC_DIR = Path(__file__).parent / "static"
agent = OrderingAgent(get_settings())


@asynccontextmanager
async def lifespan(_: FastAPI):
    await agent.start()
    try:
        yield
    finally:
        await agent.stop()


app = FastAPI(title="Golden Order Copilot", version="0.1.0", lifespan=lifespan)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class ChatRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: uuid4().hex, min_length=8, max_length=80)
    message: str = Field(min_length=1, max_length=4000)
    cart: list[OrderLine] = Field(default_factory=list, max_length=50)
    locale: Literal["zh-CN", "zh-TW", "en"] = "zh-CN"


class ChatResponse(BaseModel):
    session_id: str
    message: str


@app.get("/", include_in_schema=False)
async def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "model": get_settings().copilot_model}


@app.get("/api/menu")
async def menu() -> list[dict]:
    return [item.model_dump() for item in MENU]


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        reply = await agent.chat(
            request.session_id,
            request.message,
            [line.model_dump() for line in request.cart],
            request.locale,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"点餐 Agent 暂时无法回复：{exc}") from exc
    return ChatResponse(session_id=request.session_id, message=reply)
