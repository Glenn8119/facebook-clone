from fastapi import APIRouter
from facebook_clone.schema.user import SignUpRequestBody, Token, User
from facebook_clone.business_model.user import UserBo
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated, List
from fastapi import Depends
from facebook_clone.response import to_json_response

router = APIRouter()


@router.post('/sign_up')
async def sign_up(user: SignUpRequestBody):
    await UserBo().create_account(account=user.account, name=user.name, password=user.password)
    return {'user': user}


@router.post('/login', response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    token = await UserBo().login(account=form_data.username, password=form_data.password)
    return {'access_token': token, 'token_type': 'bearer'}


@router.get('/recommendation', response_model=List[User])
async def get_recommendation_user_list():
    user_list = await UserBo().get_recommendation_user_list()
    print(user_list)
    return to_json_response(user_list)
