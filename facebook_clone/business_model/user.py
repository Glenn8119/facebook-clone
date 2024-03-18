from passlib.context import CryptContext
from facebook_clone.business_model import get_facebook_clone_dao_factory
from facebook_clone.data_access_object.user import UserDao

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


class UserBo:

    @staticmethod
    def hash_password(password):
        return bcrypt_context.hash(password)

    async def create_account(self, account, password):
        hashed_password = self.hash_password(password)
        async with get_facebook_clone_dao_factory().create_dao(UserDao) as dao:
            await dao.create_user(account, hashed_password)
