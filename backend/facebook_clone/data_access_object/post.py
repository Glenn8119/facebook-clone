from facebook_clone.data_access_object import BaseDao
from uuid import UUID


class PostDao(BaseDao):
    async def create_post(self, content: str, user_id: UUID):
        return await self.connection.fetchrow('''
            INSERT INTO post (content, user_id) VALUES ($1, $2)
            RETURNING *
        ''', content, user_id)

    async def get_post_list(self, user_id: UUID, offset: int, limit: int):
        return await self.connection.fetch('''
            SELECT p.id, p.content, p.user_id, p.created_at, p.updated_at, u.name AS poster, count(p.id) over() AS total
            FROM post AS p
            INNER JOIN user_table AS u ON p.user_id = u.id
            WHERE p.user_id = $1
            ORDER BY p.created_at DESC
            OFFSET $2 LIMIT $3
        ''', user_id, offset, limit)

    async def get_self_and_friend_post_list(self, user_id: UUID, offset: int, limit: int):
        return await self.connection.fetch('''
            SELECT p.id, p.content, p.user_id, p.created_at, p.updated_at, u.name AS poster, count(p.id) over() AS total
            FROM post AS p
            INNER JOIN user_table AS u ON u.id in (
                select f.friend_id from friend_relation as f
                where f.user_id = $1
            ) OR u.id = $1
            WHERE p.user_id = u.id
            ORDER BY p.created_at DESC
            OFFSET $2 LIMIT $3
        ''', user_id, offset, limit)

    async def update_post_by_id(self, post_id: UUID, user_id: UUID, content: str):
        return await self.connection.fetchrow('''
            UPDATE post
            SET content = $1, updated_at = now()
            WHERE id = $2
            AND user_id = $3
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
            SELECT p.user_id AS id, u.name
            FROM post_like AS p
            INNER JOIN user_table AS u ON u.id = p.user_id
            WHERE p.post_id = $1
        ''', post_id)

    async def get_comment_list_from_post(self, post_id: UUID):
        return await self.connection.fetch('''
            SELECT c.*, u.name AS poster, u.id AS poster_id
            FROM comment AS c
            INNER JOIN user_table AS u ON c.user_id = u.id
            WHERE c.post_id = $1
            ORDER BY c.created_at DESC
        ''', post_id)

    async def add_post_comment(self, content: str, post_id: UUID, user_id: UUID):
        return await self.connection.execute('''
            INSERT INTO comment (content, post_id, user_id) VALUES (
                $1, $2, $3
            )
            RETURNING *
        ''', content, post_id, user_id)

    async def update_post_comment(self, comment_id: UUID, user_id: UUID, content):
        return await self.connection.execute('''
            UPDATE comment
            SET content = $1, updated_at = now()
            WHERE id = $2
            and user_id = $3
            RETURNING *
        ''', content, comment_id, user_id)

    async def delete_post_comment(self, comment_id: UUID, user_id: UUID):
        return await self.connection.execute('''
            DELETE FROM comment
            WHERE id = $1
            AND user_id = $2
            RETURNING *
        ''', comment_id, user_id)
