from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.schema.user import UserOverviewItem, User
from facebook_clone.business_model import BaseBo
import asyncio


class FriendBo(BaseBo):
    async def get_recommendation_friend_list(self):
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            user = self.user
            recommendation_user_list = await dao.get_all_not_friend_list(user.get('id'))
            return await asyncio.gather(
                *[self.get_recommendation_friend_single_response(dict(recommendation_friend)) for
                  recommendation_friend in recommendation_user_list])

    async def get_recommendation_friend_single_response(self, recommendation_friend_dict):
        common_friend_list = await self.get_common_friend_list(
            recommendation_friend_dict['id'])
        combined_dict = {**recommendation_friend_dict, 'is_friend': False,
                         'common_friend_list': common_friend_list}
        return UserOverviewItem.model_validate(combined_dict)

    async def add_friend(self, target_user_id):
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            user = self.user
            await dao.add_friend_relation(user.get('id'), target_user_id)

    async def get_common_friend_list(self, friend_id):
        user_id = self.user.get('id')
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            common_friend_list = await dao.get_common_friend_list(user_id, friend_id)
            return [dict(friend) for friend in common_friend_list]

    async def get_friend_list(self):
        user_id = self.user.get('id')
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            friend_list = await dao.get_friend_list(user_id)
            return await asyncio.gather(*[self.get_friend_single_response(dict(friend)) for friend in friend_list])

    async def get_friend_single_response(self, friend_dict):
        common_friend_list = await self.get_common_friend_list(friend_dict['id'])
        combined_dict = {
            **friend_dict, 'common_friend_list': common_friend_list, 'is_friend': True}
        return UserOverviewItem.model_validate(combined_dict)