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
            SELECT p.id, p.content, p.user_id, p.created_at, p.updated_at, u.name as poster FROM post as p
            INNER JOIN user_table as u on p.user_id = u.id
            WHERE p.user_id = $1
        ''', user_id)

    async def get_friend_post_list(self, user_id: str):
        return await self.connection.fetch('''
            SELECT p.id, p.content, p.user_id, p.created_at, p.updated_at, u.name as poster FROM post as p
            INNER JOIN friend_relation as f on p.user_id = f.friend_id
            INNER JOIN user_table as u on u.id = f.friend_id
            WHERE f.user_id = $1
        ''', user_id)

    async def update_post_by_id(self, post_id: UUID, user_id: str, content: str):
        return await self.connection.fetchrow('''
            UPDATE post
            SET content = $1, updated_at = now()
            WHERE id = $2
            and user_id = $3
            RETURNING *
        ''', content, post_id, user_id)

    async def delete_post(self, post_id: UUID, user_id: UUID):
        return await self.connection.fetchrow('''
            DELETE FROM post
            where id = $1
            and user_id = $2
            RETURNING *
        ''', post_id, user_id)

    async def like_post(self, post_id: UUID, user_id: UUID):
        return await self.connection.fetchrow('''
            INSERT INTO post_like (post_id, user_id) VALUES ($1, $2)                                    
        ''', post_id, user_id)

    async def unlike_post(self, post_id: UUID, user_id: UUID):
        return await self.connection.fetchrow('''
            DELETE FROM post_like
            where post_id = $1
            and user_id = $2
            RETURNING *
        ''', post_id, user_id)

    async def get_post_liker_list(self, post_id: UUID):
        return await self.connection.fetch('''
            SELECT p.user_id as id, u.name
            FROM post_like as p
            INNER JOIN user_table as u on u.id = p.user_id
            WHERE p.post_id = $1
        ''', post_id)

    async def get_comment_list_from_post(self, post_id: UUID):
        return await self.connection.fetch('''
            SELECT c.*, u.name as poster
            FROM comment as c
            INNER JOIN user_table as u on c.user_id = u.id
            WHERE c.post_id = $1
        ''', post_id)

    async def add_comment(self, content: str, post_id: UUID, user_id: UUID):
        return await self.connection.execute('''
            INSERT INTO comment (content, post_id, user_id) VALUES (
                $1, $2, $3
            )
            RETURNING *
        ''', content, post_id, user_id)
