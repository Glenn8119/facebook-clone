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

    async def get_user_by_id(self, current_user_id, user_id):
        return await self.connection.fetchrow(
            '''
                WITH friend_cte AS (
                    SELECT friend_id
                    FROM friend_relation
                    WHERE user_id = $1
                ) 
                
                SELECT id, name, account,
                    CASE
                        WHEN id IN (SELECT * FROM friend_cte) THEN TRUE
                        ELSE FALSE
                    END AS is_friend
                FROM user_table
                WHERE id = $2
            ''', current_user_id, user_id
        )
