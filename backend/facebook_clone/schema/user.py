from pydantic import BaseModel
from uuid import UUID


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
