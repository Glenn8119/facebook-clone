from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo
from facebook_clone.data_access_object.user import UserDao
from facebook_clone.schema.user import UserDetail, UpdateUserDetailRequestBody, UpdateUserDetailResponse
from facebook_clone.business_model.friend import FriendBo


class UserBo(BaseBo):
    async def get_user_detail(self, user_id):
        user_dao: UserDao
        async with get_facebook_clone_dao_factory().create_dao_list(UserDao) as [user_dao]:
            user = await user_dao.get_user_detail_by_id(current_user_id=self.user['id'], user_id=user_id)
            friend_bo = FriendBo(user=user)

            common_friend_list = await friend_bo.get_common_friend_list(user_id=self.user['id'], friend_id=user_id)
            output = {**dict(user),
                      'common_friend_list': common_friend_list}
            return UserDetail.model_validate(output)

    async def upsert_user_detail(self, detail: UpdateUserDetailRequestBody):
        user_dao: UserDao
        async with get_facebook_clone_dao_factory().create_dao_list(UserDao) as [user_dao]:
            updated_user_detail = await user_dao.upsert_user_detail_by_id(user_id=self.user['id'], current_residence=detail.current_residence, hometown=detail.hometown, bio=detail.bio, company=detail.company, avatar_image=detail.avatar_image, cover_image=detail.cover_image)
            return UpdateUserDetailResponse.model_validate(dict(updated_user_detail))
