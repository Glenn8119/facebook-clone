from fastapi import APIRouter
from facebook_clone.schema.user import User
from facebook_clone.business_model.user import UserBo

router = APIRouter()


@router.post('/sign_up')
async def sign_up(user: User):
    await UserBo().create_account(account=user.account, password=user.password)
    return {'user': user}
