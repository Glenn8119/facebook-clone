import _axios from '@/api/_axios'
import { userDetailSchema, FEUserDetailReponseType } from '@/api/user/schema'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter'

const UserApi = {
  async getUserDetail(id: string): Promise<FEUserDetailReponseType> {
    const res = await _axios({
      url: `/user/${id}`,
      responseSchema: userDetailSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  }
}

export default UserApi
