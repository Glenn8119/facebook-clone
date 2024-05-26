import _axios from '@/api/_axios'
import { LoginRequestBody, SignUpRequestBody } from '@/types/api/user'
import {
  loginResponseSchema,
  signUpResponseSchema,
  type LoginResponseType
} from '@/api/user/schema'

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
  },

  async signUp(signUpRequestBody: SignUpRequestBody) {
    return _axios({
      url: '/user/sign_up',
      method: 'POST',
      responseSchema: signUpResponseSchema,
      body: signUpRequestBody,
      isNeedToken: false
    })
  }
}

export default UserApi
