from fastapi import APIRouter
from facebook_clone.schema.user import User

router = APIRouter()


@router.post('/')
async def get_user(user: User):
    print(user)
    return {'user': user}
