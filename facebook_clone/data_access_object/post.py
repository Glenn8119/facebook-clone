import asyncpg
from facebook_clone.data_access_object import BaseDao


class PostDao(BaseDao):
    async def create_post(self, content: str, user_id: str):
        return await self.connection.execute('''
            INSERT INTO post (content, user_id) VALUES ($1, $2)
            RETURNING *
        ''', content, user_id)
