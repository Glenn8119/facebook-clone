from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.schema.user import UserOverviewItem, User
from facebook_clone.business_model import BaseBo
import asyncio


class FriendBo(BaseBo):
    async def get_recommendation_friend_list(self):
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            user_id = self.user['id']
            recommendation_user_list = await friend_dao.get_all_not_friend_list(user_id)
            return await asyncio.gather(
                *[self.get_recommendation_friend_single_response(dict(recommendation_friend)) for
                  recommendation_friend in recommendation_user_list])

    async def get_recommendation_friend_single_response(self, recommendation_friend_dict):
        user_id = self.user['id']
        common_friend_list = await self.get_common_friend_list(user_id=user_id, friend_id=recommendation_friend_dict['id'])
        combined_dict = {**recommendation_friend_dict, 'is_friend': False,
                         'common_friend_list': common_friend_list}
        return UserOverviewItem.model_validate(combined_dict)

    async def add_friend(self, target_user_id):
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            user = self.user
            await friend_dao.add_friend_relation(user.get('id'), target_user_id)

    @staticmethod
    async def get_common_friend_list(user_id, friend_id):
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            common_friend_list = await friend_dao.get_common_friend_list(user_id, friend_id)
            return [dict(friend) for friend in common_friend_list]

    async def get_friend_list(self):
        user_id = self.user['id']
        async with get_facebook_clone_dao_factory().create_dao_list(FriendDao) as [friend_dao]:
            friend_list = await friend_dao.get_friend_list(user_id)
            return await asyncio.gather(*[self.get_friend_single_response(dict(friend)) for friend in friend_list])

    async def get_friend_single_response(self, friend_dict):
        user_id = self.user['id']
        common_friend_list = await self.get_common_friend_list(user_id=user_id, friend_id=friend_dict['id'])
        combined_dict = {
            **friend_dict, 'common_friend_list': common_friend_list, 'is_friend': True}
        return UserOverviewItem.model_validate(combined_dict)
