from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo
from facebook_clone.data_access_object.friend import FriendDao
from facebook_clone.data_access_object.user import UserDao
from facebook_clone.schema.user import UserDetail
from facebook_clone.business_model.friend import FriendBo
from facebook_clone.asyncpg import from_record_list_to_dict_list


class UserBo(BaseBo):
    async def get_user_detail(self, user_id):
        user_dao: UserDao
        async with get_facebook_clone_dao_factory().create_dao_list(UserDao) as [user_dao]:
            user = await user_dao.get_user_by_id(current_user_id=self.user['id'], user_id=user_id)
            friend_bo = FriendBo(user=user)

            common_friend_list = await friend_bo.get_common_friend_list(user_id=self.user['id'], friend_id=user_id)
            output = {**dict(user),
                      'common_friend_list': common_friend_list}
            return UserDetail.model_validate(output)

    async def update_user_detail(self, user_id):
        user_dao: UserDao
        async with get_facebook_clone_dao_factory().create_dao_list(UserDao) as [user_dao]:
            user = await user_dao.get_user_by_id(current_user_id=self.user['id'], user_id=user_id)
            friend_bo = FriendBo(user=user)

            common_friend_list = await friend_bo.get_common_friend_list(user_id=self.user['id'], friend_id=user_id)
            output = {**dict(user),
                      'common_friend_list': common_friend_list}
            return UserDetail.model_validate(output)
