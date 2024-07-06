from facebook_clone.data_access_object.post import PostDao
from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo
from facebook_clone.business_model.friend import FriendBo
from uuid import UUID
from facebook_clone.asyncpg import from_record_list_to_dict_list
from facebook_clone.schema.post import Post
import asyncio


class PostBo(BaseBo):
    async def create_post(self, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.create_post(content, self.user['id'])

    async def update_post_by_id(self, post_id: UUID, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.update_post_by_id(post_id=post_id, user_id=self.user['id'], content=content)

    async def get_post_list(self):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            # TODO: user pool
            self_post_list = from_record_list_to_dict_list(await post_dao.get_post_list(self.user['id']))
            friend_post_list = from_record_list_to_dict_list(await post_dao.get_friend_post_list(self.user['id']))
            post_list = [*self_post_list, *friend_post_list]
            post_list_response = await asyncio.gather(*[self.get_single_post_response(post=post) for post in post_list])
            sorted_post_list = sorted(post_list_response,
                                      key=lambda post: post['created_at'], reverse=True)
            print(666, sorted_post_list)
            v = [Post.model_validate(post) for post in
                 sorted_post_list]

            print(8888, v)
            return v

    async def get_single_post_response(self, post):
        post_dao: PostDao
        friend_bo: FriendBo
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            friend_bo = FriendBo(user=self.user)
            # TODO: use pool
            liker_list = from_record_list_to_dict_list(await post_dao.get_post_liker_list(post_id=post['id']))
            comment_list = from_record_list_to_dict_list(await post_dao.get_comment_list_from_post(post_id=post['id']))

            liker_list_with_common_friend_list = await asyncio.gather(*[friend_bo.append_common_friend_list_to_dict_with_user_id(liker) for liker in liker_list])

            return {**post, 'liker_list': liker_list_with_common_friend_list, 'comment_list': comment_list}

    async def delete_post(self, post_id: UUID):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.delete_post(post_id=post_id, user_id=self.user['id'])

    async def like_post(self, post_id: UUID):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            await post_dao.like_post(post_id=post_id, user_id=self.user['id'])

    async def unlike_post(self, post_id: UUID):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            await post_dao.unlike_post(post_id=post_id, user_id=self.user['id'])
