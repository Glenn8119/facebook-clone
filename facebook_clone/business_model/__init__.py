from facebook_clone.data_access_object import DaoFactory
from facebook_clone.config import get_settings

settings = get_settings()
facebook_clone_dao_factory = DaoFactory(host=settings.host, password=settings.password, username=settings.username,
                                        port=settings.port, database=settings.database)


def get_facebook_clone_dao_factory():
    return facebook_clone_dao_factory
