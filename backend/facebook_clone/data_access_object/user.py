from facebook_clone.data_access_object import BaseDao


class UserDao(BaseDao):
    async def create_user(self, account, name, password):
        return await self.connection.fetchrow(
            '''
            INSERT INTO user_table (account, name, hashed_password)
            VALUES($1, $2, $3)
            RETURNING account, name
            ''', account, name, password
        )

    async def get_user_by_account(self, account):
        return await self.connection.fetchrow(
            '''
                SELECT * FROM user_table
                WHERE account = $1
            ''', account
        )

    async def get_user_auth_info_by_id(self, user_id):
        return await self.connection.fetchrow(
            '''                
                SELECT id, name, account, avatar_image
                FROM user_table
                WHERE id = $1
            ''', user_id
        )

    async def get_user_detail_by_id(self, current_user_id, user_id):
        return await self.connection.fetchrow(
            '''
                WITH friend_cte AS (
                    SELECT friend_id
                    FROM friend_relation
                    WHERE user_id = $1
                ) 
                
                SELECT u.id, u.name, u.account, u.avatar_image, ud.current_residence, ud.bio, ud.company, ud.cover_image, ud.hometown,
                    CASE
                        WHEN id IN (SELECT * FROM friend_cte) THEN TRUE
                        ELSE FALSE
                    END AS is_friend
                FROM user_table u
                LEFT JOIN user_detail ud ON ud.user_id = u.id
                WHERE id = $2
            ''', current_user_id, user_id
        )

    async def upsert_user_detail_by_id(self, user_id, current_residence, hometown, bio, company, cover_image):
        return await self.connection.fetchrow(
            '''
                INSERT INTO user_detail (user_id, current_residence, hometown, bio, company, cover_image)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT(user_id) DO UPDATE
                SET current_residence = $2, hometown = $3, bio = $4, company = $5, cover_image = $6
                RETURNING *
            ''', user_id, current_residence, hometown, bio, company, cover_image
        )

    # TODO: transaction
    async def update_user_avatar_image(self, user_id, avatar_image):
        return await self.connection.fetchrow(
            '''
                UPDATE user_table
                SET avatar_image = $2
                WHERE id = $1
                RETURNING *
            ''', user_id, avatar_image
        )
