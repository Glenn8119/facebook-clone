from facebook_clone.data_access_object.post import PostDao
from facebook_clone.business_model import get_facebook_clone_dao_factory


class PostBo:
    @staticmethod
    async def create_post(content: str):
        post_dao: PostDao
        async with get_facebook_clone_dao_factory().create_dao(PostDao) as post_dao:
            await post_dao.create_post(content)
