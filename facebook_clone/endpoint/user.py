from fastapi import APIRouter
from facebook_clone.schema.user import User
from facebook_clone.business_model.user import UserBo
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import Depends

router = APIRouter()


@router.post('/sign_up')
async def sign_up(user: User):
    await UserBo().create_account(account=user.account, password=user.password)
    return {'user': user}


@router.post('/login')
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    await UserBo().login(account=form_data.username, password=form_data.password)
