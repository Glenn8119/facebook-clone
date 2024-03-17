from pydantic import BaseModel


class User(BaseModel):
    account: str
    password: str
