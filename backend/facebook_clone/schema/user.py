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
    avatar_image: Optional[str] = None


class UserOverview(User):
    common_friend_list: List[User]
    is_friend: bool


class UserAuthDetail(User):
    account: str


class UserDetail(UserOverview):
    current_residence: Optional[str] = None
    hometown: Optional[str] = None
    bio: Optional[str] = None
    company: Optional[str] = None
    cover_image: Optional[str] = None


class UpdateUserDetailRequestBody(BaseModel):
    current_residence: Optional[str] = None
    hometown: Optional[str] = None
    bio: Optional[str] = None
    company: Optional[str] = None
    avatar_image: Optional[str] = None
    cover_image: Optional[str] = None


class UpdateUserDetailResponse(UpdateUserDetailRequestBody):
    pass
