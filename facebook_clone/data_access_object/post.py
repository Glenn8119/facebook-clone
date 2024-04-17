import asyncpg
from facebook_clone.data_access_object import BaseDao


class PostDao(BaseDao):
    async def create_post(self, content: str):
        print(1111, content)
        return await self.connection.execute('''
            INSERT INTO post (content, user_id) VALUES ($1, $2)
            RETURNING *
        ''', content, 'aaf6ec4c-d79e-40b6-a42d-d76da922e691')
