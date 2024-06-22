from facebook_clone.data_access_object.post import PostDao
from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo
from uuid import UUID


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
            return await post_dao.get_post_list(self.user['id'])

    async def delete_post(self, post_id: UUID):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao_list(PostDao) as [post_dao]:
            return await post_dao.delete_post(post_id=post_id, user_id=self.user['id'])
