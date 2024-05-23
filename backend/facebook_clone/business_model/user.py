from passlib.context import CryptContext
from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.user import UserDao
from jose import jwt
from datetime import timedelta, datetime
from fastapi import HTTPException
from facebook_clone.config import get_settings

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

settings = get_settings()


class UserBo:
    def __init__(self, algorithm=settings.algorithm, secret_key=settings.secret_key):
        self.algorithm = algorithm
        self.secret_key = secret_key

    @staticmethod
    def hash_password(password):
        return bcrypt_context.hash(password)

    async def create_account(self, account, name, password):
        hashed_password = self.hash_password(password)
        async with get_facebook_clone_dao_factory().create_dao(UserDao) as dao:
            await dao.create_user(account, name, hashed_password)

    async def login(self, account: str, password: str):
        user = await self.authenticate_user(account, password)

        if not user:
            raise HTTPException(status_code=401, detail='Invalid user.')

        token = self.create_access_token(
            account, user['id'], timedelta(hours=24))
        return token

    @staticmethod
    async def authenticate_user(account: str, password: str):
        async with get_facebook_clone_dao_factory().create_dao(UserDao) as dao:
            user = await dao.get_user(account)
            if not user:
                return False
            if not bcrypt_context.verify(password, user['hashed_password']):
                return False
            return user

    def create_access_token(self, account: str, user_id: int, expires_delta: timedelta):
        encode = {'sub': account, 'id': str(user_id)}
        expires = datetime.utcnow() + expires_delta
        encode.update({'exp': expires})

        return jwt.encode(encode, self.secret_key, algorithm=self.algorithm)
