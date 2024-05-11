import _axios from '@/api/_axios'
import { LoginRequestBody } from '@/types/api/user'

const UserApi = {
  async login({ account, password }: LoginRequestBody) {
    return await _axios({
      method: 'POST',
      url: '/user/login',
      body: {
        username: account,
        password
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}

export default UserApi
