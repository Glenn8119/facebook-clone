from facebook_clone.data_access_object import BaseDao


class UserDao(BaseDao):
    async def create_user(self, account, password):
        return await self.connection.execute(
            '''
            INSERT INTO user_table (account, hashed_password)
            VALUES($1, $2)
            RETURNING *
            ''', account, password
        )

    async def get_user(self, account):
        return await self.connection.fetchrow(
            '''
                SELECT * FROM user_table
                WHERE account = $1
            ''', account
        )
