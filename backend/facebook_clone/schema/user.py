from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional


class SignUpRequestBody(BaseModel):
    account: str
    name: str
    password: str


class RefreshTokenRequestBody(BaseModel):
    refresh_token: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class User(BaseModel):
    id: UUID
    name: str


class UserOverview(User):
    common_friend_list: List[User]
    is_friend: bool


class UserAuthDetail(User):
    account: str


class UserDetail(UserOverview):
    current_residence: Optional[str]
    bio: Optional[str]
    company: Optional[str]
    avatar_image: Optional[str]
    cover_image: Optional[str]
