from facebook_clone.data_access_object import BaseDao


class UserDao(BaseDao):
    async def create_user(self, account, password):
        return await self.connection.fetchrow(
            '''
            INSERT INTO user_table (account, hashed_password)
            VALUES($1, $2)
            RETURNING *
            ''', account, password
        )
