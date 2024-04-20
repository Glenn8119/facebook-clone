from fastapi import APIRouter, Depends
from facebook_clone.schema.post import Post
from facebook_clone.business_model.post import PostBo
from typing import Annotated
from facebook_clone.schema.user import User
from facebook_clone.depend import depend_user
from facebook_clone.response import to_json_response

router = APIRouter()


@router.post('/', response_model=Post)
async def create_post(post: Post, user: depend_user):
    post = await PostBo(user=user).create_post(post.content)
    return to_json_response(post)
