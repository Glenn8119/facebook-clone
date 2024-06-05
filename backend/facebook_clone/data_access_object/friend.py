from facebook_clone.data_access_object import BaseDao


class FriendDao(BaseDao):
    async def get_all_user_list(self, excluded_user_id):
        return await self.connection.fetch(
            '''
                SELECT * FROM user_table
                WHERE NOT id = $1 
            ''', excluded_user_id
        )

    async def add_friend_relation(self, user_id, target_user_id):
        await self.connection.execute(
            '''
                INSERT INTO friend_relation (user_id, friend_id)
                VALUES
                ($1, $2),
                ($2, $1)
            ''', user_id, target_user_id
        )

    async def get_common_friend_list(self, user_id, friend_id):
        print(user_id, friend_id)
        return await self.connection.fetch('''
            SELECT u.name, u.account, u.id
            FROM user_table as u
            INNER JOIN friend_relation as f1 ON f1.friend_id = u.id
            INNER JOIN friend_relation as f2 ON f2.friend_id = f1.friend_id
            WHERE f1.user_id = $1 AND f2.user_id = $2
        ''', user_id, friend_id)
