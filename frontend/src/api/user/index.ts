import _axios from '@/api/_axios'
import {
  userDetailSchema,
  FEUserDetailReponseType,
  userProfileSchema,
  FEUserProfileType
} from '@/api/user/schema'
import { UpdateUserDetailRequestBody } from '@/types/api/user'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'

const UserApi = {
  async getUserDetail(id: string): Promise<FEUserDetailReponseType> {
    const res = await _axios({
      url: `/user/${id}`,
      responseSchema: userDetailSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async updateUserDetail(
    body: UpdateUserDetailRequestBody
  ): Promise<FEUserProfileType> {
    const res = await _axios({
      url: `/user`,
      responseSchema: userProfileSchema,
      method: 'POST',
      body
    })

    return transformObjectKeyFromSnakeToCamel(res)
  }
}

export default UserApi
