from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from typing import Annotated
from facebook_clone.config import get_settings
from starlette import status
from jose import JWTError, jwt

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/user/login')

settings = get_settings()


def get_current_user(token: Annotated[dict, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        account: str = payload.get('sub')
        user_id: int = payload.get('id')
        if account is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')

        return {'account': account, 'id': user_id}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')


depend_user = Annotated[dict, Depends(get_current_user)]
