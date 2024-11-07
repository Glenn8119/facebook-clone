from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List
from facebook_clone.schema.user import User


class PostPostRequestBody(BaseModel):
    content: str


class PutPostRequestBody(BaseModel):
    content: str


class PostCommentRequestBody(BaseModel):
    content: str


class PutCommentRequestBody(BaseModel):
    content: str


class Comment(BaseModel):
    id: UUID
    poster: str
    poster_id: UUID
    content: str
    created_at: datetime
    updated_at: datetime


class Liker(User):
    is_friend: bool


class Post(BaseModel):
    comment_list: List[Comment]
    liker_list: List[Liker]
    poster: str
    id: UUID
    content: str
    user_id: UUID
    created_at: datetime
    updated_at: datetime
