from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.schema.user import User
from facebook_clone.business_model import BaseBo


class FriendBo(BaseBo):
    async def get_recommendation_user_list(self):
        async with get_facebook_clone_dao_factory().create_dao(FriendDao) as dao:
            user = self.user
            recommendation_user_list = await dao.get_all_user_list(user.get('id'))
            return [User.model_validate({'id': user.get('id'), 'name': user.get('name')}) for user in recommendation_user_list]
