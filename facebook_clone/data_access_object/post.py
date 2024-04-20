from facebook_clone.data_access_object import BaseDao
from uuid import UUID


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

    async def delete_post(self, post_id: UUID, user_id):
        return await self.connection.fetchrow('''
            DELETE FROM post
            where id = $1
            and user_id = $2
            RETURNING *
        ''', post_id, user_id)
