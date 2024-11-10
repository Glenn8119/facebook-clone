from facebook_clone.data_access_object.post import PostDao
from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo
from facebook_clone.business_model.friend import FriendBo
from uuid import UUID
from facebook_clone.asyncpg import from_record_list_to_dict_list
from facebook_clone.schema.post import Post, Comment
import asyncio
from facebook_clone.response import PageResponse


def get_page_offset(page: int, limit: int):
    return (page - 1) * limit


class PostBo(BaseBo):
    async def create_post(self, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.create_post(content, self.user['id'])

    async def update_post_by_id(self, post_id: UUID, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.update_post_by_id(post_id=post_id, user_id=self.user['id'], content=content)

    # 首頁貼文列表拿自己的貼文 + 所有好友的貼文來顯示
    async def get_post_list(self, page: int, limit: int):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            # TODO: user pool
            offset = get_page_offset(page=page, limit=limit)
            post_list = from_record_list_to_dict_list(await post_dao.get_self_and_friend_post_list(user_id=self.user['id'], offset=offset, limit=limit))
            total = post_list[0]['total'] if post_list else 0
            post_list_response = await asyncio.gather(*[self.get_single_post_response(post=post) for post in post_list])
            post_page_result = [Post.model_validate(post) for post in
                                post_list_response]
            return PageResponse(page=page, total=total, page_size=limit, result=post_page_result)

    async def get_post_comment_list(self, post_id: UUID, page: int, limit: int):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            # TODO: user pool
            offset = get_page_offset(page=page, limit=limit)
            comment_list = from_record_list_to_dict_list(await post_dao.get_comment_list_from_post(post_id=post_id, offset=offset, limit=limit))
            total = comment_list[0]['total'] if comment_list else 0
            post_comment_page_result = [Comment.model_validate(comment) for comment in
                                        comment_list]
            return PageResponse(page=page, total=total, page_size=limit, result=post_comment_page_result)

    async def get_post_list_by_user_id(self, user_id, page: int, limit: int):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            # TODO: user pool
            offset = get_page_offset(page=page, limit=limit)
            post_list = from_record_list_to_dict_list(await post_dao.get_post_list(user_id=user_id, offset=offset, limit=limit))
            total = post_list[0]['total'] if post_list else 0
            post_list_response = await asyncio.gather(*[self.get_single_post_response(post=post) for post in post_list])
            post_page_result = [Post.model_validate(post) for post in
                                post_list_response]
            return PageResponse(page=page, total=total, page_size=limit, result=post_page_result)

    # 拿到 liker list 以及留言的前三筆
    async def get_single_post_response(self, post):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            # TODO: use pool
            liker_list = from_record_list_to_dict_list(await post_dao.get_post_liker_list(current_user_id=self.user['id'], post_id=post['id']))
            comment_list = from_record_list_to_dict_list(await post_dao.get_comment_list_from_post(post_id=post['id'], limit=3, offset=0))
            comment_total_count = comment_list[0]['total'] if comment_list else 0
            return {**post, 'liker_list': liker_list, 'comment_list': comment_list, 'comment_total_count': comment_total_count}

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

    async def create_post_comment(self, post_id: UUID, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.add_post_comment(post_id=post_id, user_id=self.user['id'], content=content)

    async def update_post_comment(self, comment_id: UUID, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.update_post_comment(comment_id=comment_id, user_id=self.user['id'], content=content)

    async def delete_post_comment(self, comment_id: UUID):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.delete_post_comment(comment_id=comment_id, user_id=self.user['id'])
