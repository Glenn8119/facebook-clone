from passlib.context import CryptContext
from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.user import UserDao
from facebook_clone.schema.user import User
from jose import jwt
from datetime import timedelta, datetime
from fastapi import HTTPException

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

SECRET_KEY = '228282ca2359518559ffe96f0364af624399d43d4f9344340f1ca501fb552485'
ALGORITHM = 'HS256'


class UserBo:

    @staticmethod
    def hash_password(password):
        return bcrypt_context.hash(password)

    async def create_account(self, account, password):
        hashed_password = self.hash_password(password)
        async with get_facebook_clone_dao_factory().create_dao(UserDao) as dao:
            await dao.create_user(account, hashed_password)

    async def login(self, account: str, password: str):
        user = await self.authenticate_user(account, password)

        if not user:
            raise HTTPException(status_code=401, detail='Invalid user.')

        token = self.create_access_token(account, user['id'], timedelta(minutes=20))
        print('token', token)
        return {'access_token': token, 'token_type': 'bearer'}

    @staticmethod
    async def authenticate_user(account: str, password: str):
        async with get_facebook_clone_dao_factory().create_dao(UserDao) as dao:
            user = await dao.get_user(account)
            if not user:
                return False
            if not bcrypt_context.verify(password, user['hashed_password']):
                return False
            return user

    @staticmethod
    def create_access_token(account: str, user_id: int, expires_delta: timedelta):
        encode = {'sub': account, 'id': user_id}
        expires = datetime.utcnow() + expires_delta
        encode.update({'exp': expires})

        # TODO: debug - Object of type UUID is not JSON serializable
        # TODO: put key and algorithm in env file
        # TODO: json response
        return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
