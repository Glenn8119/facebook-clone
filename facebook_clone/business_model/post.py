from facebook_clone.data_access_object.post import PostDao
from facebook_clone.business_model import get_facebook_clone_dao_factory, BaseBo


class PostBo(BaseBo):
    async def create_post(self, content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao(PostDao) as post_dao:
            return await post_dao.create_post(content, self.user.get('id'))

    async def get_post_list(self):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao(PostDao) as post_dao:
            return await post_dao.get_post_list(self.user.get('id'))
