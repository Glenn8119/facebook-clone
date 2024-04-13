from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    host: str
    password: str
    port: int
    username: str
    database: str
    secret_key: str
    algorithm: str

    model_config = SettingsConfigDict(env_file="config.local.env")


@lru_cache
def get_settings():
    return Settings()
