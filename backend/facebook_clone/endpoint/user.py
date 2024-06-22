from fastapi import APIRouter
from facebook_clone.response import to_json_response
from facebook_clone.depend import depend_user
from facebook_clone.business_model.user import UserBo
from facebook_clone.schema.user import UserDetailItem

router = APIRouter()


@router.get('/{user_id}', response_model=UserDetailItem)
async def get_user_detail(user: depend_user, user_id):
    res = await UserBo(user=user).get_user_detail(user_id=user_id)
    return to_json_response(res)
