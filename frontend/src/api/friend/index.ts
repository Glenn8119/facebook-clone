import _axios from '@/api/_axios'
import {
  friendRecommendationListSchema,
  FERecommendationFriendSingleResponseType,
  addFriendReponseSchema,
  FEAddFriendReponseSchema,
  FEFriendSingleResponseType,
  friendListSchema
} from '@/api/friend/schema'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'

const FriendApi = {
  async getRecommendationFriendList(): Promise<
    FERecommendationFriendSingleResponseType[]
  > {
    const res = await _axios({
      url: '/friend/recommendation',
      responseSchema: friendRecommendationListSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async addFriend(id: string): Promise<FEAddFriendReponseSchema> {
    const res = await _axios({
      url: `/friend/${id}`,
      method: 'POST',
      responseSchema: addFriendReponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async deleteFriend(id: string): Promise<void> {
    await _axios({
      url: `/friend/${id}`,
      method: 'DELETE'
    })
  },

  async getFriendList(id: string): Promise<FEFriendSingleResponseType[]> {
    const res = await _axios({
      url: `/friend/list/${id}`,
      responseSchema: friendListSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  }
}

export default FriendApi
