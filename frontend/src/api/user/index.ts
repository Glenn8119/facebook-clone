import _axios from '@/api/_axios'
import { LoginRequestBody } from '@/types/api/user'
import { loginResponseSchema, type LoginResponseType } from '@/api/user/schema'

const UserApi = {
  async login({
    account,
    password
  }: LoginRequestBody): Promise<LoginResponseType> {
    return await _axios({
      url: '/user/login',
      method: 'POST',
      responseSchema: loginResponseSchema,
      // the key 'username' of request body here comes from OAuth2PasswordRequestForm in FastApi, but actually it means user's account.
      body: {
        username: account,
        password
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      isNeedToken: false
    })
  }
}

export default UserApi
