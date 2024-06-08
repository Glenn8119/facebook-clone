import _axios from '@/api/_axios'
import { LoginRequestBody, SignUpRequestBody } from '@/types/api/user'
import {
  loginResponseSchema,
  signUpResponseSchema,
  type FELoginResponseType
} from '@/api/user/schema'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter'

const UserApi = {
  async login({
    account,
    password
  }: LoginRequestBody): Promise<FELoginResponseType> {
    const res = await _axios({
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

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async signUp(signUpRequestBody: SignUpRequestBody) {
    return await _axios({
      url: '/user/sign_up',
      method: 'POST',
      responseSchema: signUpResponseSchema,
      body: signUpRequestBody,
      isNeedToken: false
    })
  }
}

export default UserApi
