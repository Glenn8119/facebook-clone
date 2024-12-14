from typing import List
from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.schema.friend import Friend
from facebook_clone.schema.user import UserOverview
from facebook_clone.business_model import BaseBo
from facebook_clone.asyncpg import from_record_list_to_dict_list
import asyncio


class FriendBo(BaseBo):
    async def get_recommendation_friend_list(self):
        friend_dao: FriendDao
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            user_id = self.user['id']
            recommendation_user_list = await friend_dao.get_all_not_friend_list(user_id)
            recommendation_user_list = [{**recommendation_user, 'is_friend': False}
                                        for recommendation_user in recommendation_user_list]
            recommendation_user_list = await asyncio.gather(
                *[self.append_common_friend_list_to_dict_with_user_id(dict(recommendation_friend)) for
                  recommendation_friend in recommendation_user_list])
            return [UserOverview.model_validate(recommendation_user) for recommendation_user in recommendation_user_list]

    async def add_friend(self, target_user_id):
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            user = self.user
            await friend_dao.add_friend_relation(user.get('id'), target_user_id)

    async def delete_friend(self, target_user_id):
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            user = self.user
            await friend_dao.delete_friend_relation(user.get('id'), target_user_id)

    @staticmethod
    async def get_common_friend_list(user_id, friend_id):
        friend_dao: FriendDao
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            common_friend_list = await friend_dao.get_common_friend_list(user_id, friend_id)
            return [dict(friend) for friend in common_friend_list]

    # 對象是朋友或是自己 -> 拿所有好友, 對象是非好友 -> 僅拿共同好友
    async def get_friend_list(self, user_id):
        friend_dao: FriendDao
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            is_friend = bool(await friend_dao.get_friend_relation(user_id=self.user['id'], friend_id=user_id))
            is_the_user = user_id == self.user['id']
            friend_list_value = None
            if is_friend or is_the_user:
                friend_list_value = from_record_list_to_dict_list(await friend_dao.get_friend_list(current_user_id=self.user['id'], user_id=user_id))
            else:
                friend_list_value = await self.get_common_friend_list(user_id=self.user['id'], friend_id=user_id)
                friend_list_value = [{**friend, 'is_friend': True}
                                     for friend in friend_list_value]
            res = await self.get_user_detail_friend_list_value(
                friend_list=friend_list_value)
            return res

    async def get_user_detail_friend_list_value(self, friend_list: List[dict]):
        res = await asyncio.gather(
            *[self.get_user_detail_friend_single_value(friend=friend) for friend in friend_list])
        return res

    async def get_user_detail_friend_single_value(self, friend: dict):
        user = self.user
        common_friend_list = await self.get_common_friend_list(user_id=user['id'], friend_id=friend['id'])
        return Friend.model_validate({**friend, 'common_friend_list': common_friend_list})

    async def append_common_friend_list_to_dict_with_user_id(self, user_id_dict):
        user_id = self.user['id']
        common_friend_list = await self.get_common_friend_list(user_id=user_id, friend_id=user_id_dict['id'])
        return {**user_id_dict, 'common_friend_list': common_friend_list}
