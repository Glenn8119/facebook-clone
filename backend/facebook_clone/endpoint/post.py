from fastapi import APIRouter
from facebook_clone.schema.post import Post, PostPostRequestBody, PutPostRequestBody
from facebook_clone.business_model.post import PostBo
from typing import List
from facebook_clone.depend import depend_user
from facebook_clone.response import to_json_response
from uuid import UUID
from starlette import status

router = APIRouter()


@router.post('', response_model=Post)
async def create_post(post: PostPostRequestBody, user: depend_user):
    post = await PostBo(user=user).create_post(post.content)
    return to_json_response(post)


@router.get('/list', response_model=List[Post])
async def get_post_list(user: depend_user):
    post_list = await PostBo(user=user).get_post_list()
    print(00000, post_list)
    return to_json_response(post_list)


@router.put('', response_model=Post)
async def update_post(post: PutPostRequestBody, user: depend_user):
    post = await PostBo(user=user).update_post_by_id(post_id=post.id, content=post.content)
    return to_json_response(post)


@router.delete('/{post_id}', response_model=Post)
async def delete_post(post_id: UUID, user: depend_user):
    post = await PostBo(user=user).delete_post(post_id)
    return to_json_response(post)


@router.post('/like/{post_id}', status_code=status.HTTP_204_NO_CONTENT)
async def like_post(post_id: UUID, user: depend_user):
    await PostBo(user=user).like_post(post_id=post_id)


@router.post('/unlike/{post_id}', status_code=status.HTTP_204_NO_CONTENT)
async def like_post(post_id: UUID, user: depend_user):
    await PostBo(user=user).unlike_post(post_id=post_id)
