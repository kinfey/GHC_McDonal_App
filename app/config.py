from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    copilot_model: str = "gpt-6-astra"
    copilot_reasoning_effort: str = "high"

    mcd_mcp_url: str = "https://mcp.mcd.cn"
    mcd_mcp_token: str = Field(default="", repr=False)

    email_mode: str = "console"
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = Field(default="", repr=False)
    smtp_from_email: str = "no-reply@example.com"
    smtp_use_tls: bool = True


@lru_cache
def get_settings() -> Settings:
    return Settings()
