from facebook_clone.data_access_object import BaseDao


class FriendDao(BaseDao):
    async def get_all_user_list(self):
        return await self.connection.fetch(
            '''
                SELECT * FROM user_table
            '''
        )
