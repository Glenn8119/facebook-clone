from fastapi import APIRouter
from facebook_clone.response import to_json_response
from facebook_clone.depend import depend_user
from facebook_clone.business_model.user import UserBo
from facebook_clone.schema.user import UserDetail, UpdateUserDetailRequestBody

router = APIRouter()


@router.get('/{user_id}', response_model=UserDetail)
async def get_user_detail(user: depend_user, user_id):
    res = await UserBo(user=user).get_user_detail(user_id=user_id)
    return to_json_response(res)


@router.post('/', response_model=UpdateUserDetailRequestBody)
async def upsert_user_detail(user: depend_user, detail: UpdateUserDetailRequestBody):
    res = await UserBo(user=user).upsert_user_detail(detail=detail)
    return to_json_response(res)
