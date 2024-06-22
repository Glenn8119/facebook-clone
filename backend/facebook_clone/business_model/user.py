from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.data_access_object.user import UserDao
from facebook_clone.schema.user import UserDetailItem
from facebook_clone.business_model.friend import FriendBo
from facebook_clone.asyncpg import from_record_list_to_dict_list
from typing import List
import asyncio


class UserBo(BaseBo):
    async def get_user_detail(self, user_id):
        friend_dao: FriendDao
        user_dao: UserDao
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao, UserDao) as [friend_dao, user_dao]:
            is_friend = bool(await friend_dao.get_friend_relation(user_id=self.user['id'], friend_id=user_id))

            user = await user_dao.get_user_by_id(user_id=user_id)
            friend_bo = FriendBo(user=user)
            friend_list = from_record_list_to_dict_list(await friend_dao.get_friend_list(user_id=user_id))
            common_friend_dict_list = await friend_bo.get_common_friend_list(user_id=self.user['id'], friend_id=user_id)
            friend_list_value = friend_list if is_friend else common_friend_dict_list
            friend_list_response_value = await self.get_user_detail_friend_list_value(friend_bo=friend_bo,
                                                                                      friend_list=friend_list_value)
            print('is_friend', is_friend)
            print(user)
            print(friend_list)
            print(common_friend_dict_list)
            print(friend_list_response_value)
            output = {**dict(user), 'friend_list': friend_list_response_value,
                      'common_friend_list': common_friend_dict_list, 'is_friend': is_friend}
            return UserDetailItem.model_validate(output)

    async def get_user_detail_friend_list_value(self, friend_bo, friend_list: List[dict]):
        res = await asyncio.gather(
            *[self.get_user_detail_friend_single_value(friend_bo=friend_bo, friend=friend) for friend in friend_list])
        return res

    async def get_user_detail_friend_single_value(self, friend_bo: FriendBo, friend: dict):
        user = self.user
        common_friend_list = await friend_bo.get_common_friend_list(user_id=user['id'], friend_id=friend.get('id'))
        return {'id': friend['id'], 'name': friend['name'], 'common_friend_list': common_friend_list}
