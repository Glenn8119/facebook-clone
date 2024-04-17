from fastapi import APIRouter, Depends
from facebook_clone.schema.post import Post
from facebook_clone.business_model.post import PostBo
from typing import Annotated

router = APIRouter()


@router.post('/')
async def create_post(post: Post):
    post = await PostBo().create_post(post.content)
    print('create post successfully')
