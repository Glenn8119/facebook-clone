from facebook_clone.data_access_object import BaseDao


class FriendDao(BaseDao):
    async def get_all_user_list(self, excluded_user_id):
        return await self.connection.fetch(
            '''
                SELECT * FROM user_table
                WHERE NOT id = $1 
            ''', excluded_user_id
        )
