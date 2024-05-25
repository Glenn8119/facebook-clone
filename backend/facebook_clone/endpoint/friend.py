from fastapi import APIRouter
from facebook_clone.response import to_json_response
from typing import List
from facebook_clone.schema.user import User
from facebook_clone.depend import depend_user
from facebook_clone.business_model.friend import FriendBo


router = APIRouter()


@router.get('/recommendation', response_model=List[User])
async def get_recommendation_user_list(user: depend_user):
    user_list = await FriendBo(user=user).get_recommendation_user_list()
    return to_json_response(user_list)
