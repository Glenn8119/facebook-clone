from pydantic import BaseModel


class User(BaseModel):
    account: str
    name: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
