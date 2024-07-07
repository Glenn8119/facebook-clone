from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List
from facebook_clone.schema.user import UserOverviewItem


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
    content: str
    created_at: datetime
    updated_at: datetime


class Post(BaseModel):
    comment_list: List[Comment]
    liker_list: List[UserOverviewItem]
    poster: str
    id: UUID
    content: str
    user_id: UUID
    created_at: datetime
    updated_at: datetime
