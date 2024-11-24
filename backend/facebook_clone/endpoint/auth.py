from fastapi import APIRouter
from facebook_clone.schema.user import SignUpRequestBody, Token, UserAuthDetail, RefreshTokenRequestBody
from facebook_clone.business_model.auth import AuthBo
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import Depends
from facebook_clone.response import to_json_response
from facebook_clone.depend import depend_user

router = APIRouter()


@router.post('/sign_up')
async def sign_up(user: SignUpRequestBody):
    user_response = await AuthBo().create_account(account=user.account, name=user.name, password=user.password)
    return to_json_response(user_response)


@router.post('/login', response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    tokens = await AuthBo().login(account=form_data.username, password=form_data.password)
    return {'access_token': tokens['access_token'], 'refresh_token': tokens['refresh_token'], 'token_type': 'bearer'}


@router.get('/info', response_model=UserAuthDetail)
async def get_user_detail(user: depend_user):
    user = await AuthBo(user=user).get_user_auth_info()
    return to_json_response(user)


@router.post('/refresh_token', response_model=Token)
async def refresh_token(body: RefreshTokenRequestBody):
    tokens = await AuthBo().refresh_token(refresh_token=body.refresh_token)
    return {'access_token': tokens['access_token'], 'refresh_token': tokens['refresh_token'], 'token_type': 'bearer'}
