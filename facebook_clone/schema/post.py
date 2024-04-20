from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class PostPostRequestBody(BaseModel):
    content: str


class Post(BaseModel):
    id: UUID
    content: str
    user_id: UUID
    created_at: datetime
    updated_at: datetime
