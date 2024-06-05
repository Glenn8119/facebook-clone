from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.schema.user import UserOverviewItem, User
from facebook_clone.business_model import BaseBo
import asyncio


class FriendBo(BaseBo):
    async def get_recommendation_user_list(self):
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            user = self.user
            recommendation_user_list = await dao.get_all_user_list(user.get('id'))
            parsed_user_list = [User.model_validate(dict(recommendation_user)) for recommendation_user in
                                recommendation_user_list]
            return await asyncio.gather(*[self.get_recommendation_user_list_response(recommendation_friend) for
                                          recommendation_friend in parsed_user_list])

    async def get_recommendation_user_list_response(self, recommendation_friend: User):
        common_friend_list = await self.get_common_friend_list(
            recommendation_friend.id)
        parsed_common_friend_list = [User.model_validate(
            dict(friend)) for friend in common_friend_list]
        return UserOverviewItem.model_validate(
            {'id': recommendation_friend.id, 'name': recommendation_friend.name, 'is_friend': False,
             'common_friend_list': parsed_common_friend_list})

    async def add_friend(self, target_user_id):
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            user = self.user
            await dao.add_friend_relation(user.get('id'), target_user_id)

    async def get_common_friend_list(self, friend_id):
        user_id = self.user.get('id')
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            return await dao.get_common_friend_list(user_id, friend_id)
