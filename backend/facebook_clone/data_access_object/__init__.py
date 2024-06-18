import asyncpg
import asyncio
from pydantic import BaseModel
from typing import Type, List
from contextlib import asynccontextmanager


class BaseDao:
    def __init__(self, connection: asyncpg.Connection):
        self.connection = connection


class DatabaseSettings(BaseModel):
    host: str
    username: str
    password: str
    database: str
    port: int


class DaoFactory:
    def __init__(self, host: str,
                 username: str,
                 password: str,
                 database: str,
                 port: int):
        self._settings = DatabaseSettings(
            host=host, username=username, password=password, database=database, port=port)

    async def get_connection(self):
        return await asyncpg.connect(host=self._settings.host, user=self._settings.username,
                                     password=self._settings.password, database=self._settings.database,
                                     port=self._settings.port)

    @asynccontextmanager
    async def create_dao_list(self, *dao_class_list: List[Type[BaseDao]]) -> BaseDao:
        connection = await self.get_connection()
        dao_list = [dao_class(connection) for dao_class in dao_class_list]
        try:
            yield dao_list
        finally:
            await asyncio.gather(connection.close(timeout=10), return_exceptions=True)
