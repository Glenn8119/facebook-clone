from fastapi import APIRouter
from facebook_clone.schema.user import SignUpRequestBody, Token, UserAuthDetail
from facebook_clone.business_model.user import UserBo
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import Depends
from facebook_clone.response import to_json_response
from facebook_clone.depend import depend_user

router = APIRouter()


@router.post('/sign_up')
async def sign_up(user: SignUpRequestBody):
    user_response = await UserBo().create_account(account=user.account, name=user.name, password=user.password)
    return to_json_response(user_response)


@router.post('/login', response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    token = await UserBo().login(account=form_data.username, password=form_data.password)
    return {'access_token': token, 'token_type': 'bearer'}


@router.get('/detail', response_model=UserAuthDetail)
async def get_user_info(user: depend_user):
    user = await UserBo(user=user).get_user_info()
    return to_json_response(user)
