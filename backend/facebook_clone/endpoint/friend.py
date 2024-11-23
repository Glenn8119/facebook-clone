from fastapi import APIRouter
from facebook_clone.response import to_json_response
from typing import List
from facebook_clone.schema.user import UserOverview
from facebook_clone.depend import depend_user
from facebook_clone.business_model.friend import FriendBo


router = APIRouter()


@router.get('/recommendation', response_model=List[UserOverview])
async def get_recommendation_friend_list(user: depend_user):
    user_list = await FriendBo(user=user).get_recommendation_friend_list()
    return to_json_response(user_list)


@router.post('/{user_id}', status_code=201)
async def add_friend(user: depend_user, user_id):
    await FriendBo(user=user).add_friend(target_user_id=user_id)
    return to_json_response({'id': user_id})


@router.delete('/{user_id}', status_code=204)
async def delete_friend(user: depend_user, user_id):
    await FriendBo(user=user).delete_friend(target_user_id=user_id)


@router.get('/list/{user_id}')
async def get_friend_list(user: depend_user, user_id):
    friend_list = await FriendBo(user=user).get_friend_list(user_id)
    return to_json_response(friend_list)
