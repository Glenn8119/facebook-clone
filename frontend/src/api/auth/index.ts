import _axios from '@/api/_axios'
import {
  LoginRequestBody,
  RefreshTokenRequestBody,
  SignUpRequestBody
} from '@/types/api/user'
import {
  FERefreshTokenResponseType,
  FEUserDetailResponseSchema,
  loginResponseSchema,
  refreshTokenResponseSchema,
  signUpResponseSchema,
  userDetailResponseSchema,
  type FELoginResponseType
} from '@/api/auth/schema'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'

const AuthApi = {
  async login({
    account,
    password
  }: LoginRequestBody): Promise<FELoginResponseType> {
    const res = await _axios({
      url: '/auth/login',
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
      url: '/auth/sign_up',
      method: 'POST',
      responseSchema: signUpResponseSchema,
      body: signUpRequestBody,
      isNeedToken: false
    })
  },

  async getAuthInfo(): Promise<FEUserDetailResponseSchema> {
    const res = await _axios({
      url: '/auth/info',
      responseSchema: userDetailResponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async refreshToken(
    refreshTokenRequestBody: RefreshTokenRequestBody
  ): Promise<FERefreshTokenResponseType> {
    const res = await _axios({
      url: '/auth/refresh_token',
      responseSchema: refreshTokenResponseSchema,
      isNeedToken: false,
      method: 'POST',
      body: refreshTokenRequestBody
    })

    return transformObjectKeyFromSnakeToCamel(res)
  }
}

export default AuthApi
