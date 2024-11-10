from pydantic import BaseModel
from uuid import UUID
from typing import List


class SignUpRequestBody(BaseModel):
    account: str
    name: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class User(BaseModel):
    id: UUID
    name: str


class UserOverviewItem(User):
    common_friend_list: List[User]
    is_friend: bool


class UserAuthDetail(User):
    account: str


class UserDetailItem(UserOverviewItem):
    # to be added
    pass
