import asyncpg
from facebook_clone.data_access_object import BaseDao


class PostDao(BaseDao):
    async def create_post(self, content: str, user_id: str):
        return await self.connection.fetchrow('''
            INSERT INTO post (content, user_id) VALUES ($1, $2)
            RETURNING *
        ''', content, user_id)

    async def get_post_list(self, user_id: str):
        return await self.connection.fetch('''
            SELECT * FROM post
            WHERE user_id = $1
        ''', user_id)
