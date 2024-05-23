from facebook_clone.data_access_object import BaseDao


class UserDao(BaseDao):
    async def create_user(self, account, name, password):
        return await self.connection.execute(
            '''
            INSERT INTO user_table (account, name, hashed_password)
            VALUES($1, $2, $3)
            RETURNING *
            ''', account, name, password
        )

    async def get_user(self, account):
        return await self.connection.fetchrow(
            '''
                SELECT * FROM user_table
                WHERE account = $1
            ''', account
        )

    async def get_all_user_list(self):
        return await self.connection.fetch(
            '''
                SELECT * FROM user_table
            '''
        )
