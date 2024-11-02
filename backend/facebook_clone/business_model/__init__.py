from facebook_clone.data_access_object import DaoFactory
from facebook_clone.config import get_settings
from facebook_clone.depend import CurrentUser

settings = get_settings()
facebook_clone_dao_factory = DaoFactory(host=settings.host, password=settings.password, username=settings.username,
                                        port=settings.port, database=settings.database)


def get_facebook_clone_dao_factory():
    return facebook_clone_dao_factory


class BaseBo:
    def __init__(self, user: CurrentUser):
        self.user = user
