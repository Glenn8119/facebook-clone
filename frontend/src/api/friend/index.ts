import _axios from '@/api/_axios'
import {
  friendRecommendationListSchema,
  FERecommendationFriendSingleResponseType
} from '@/api/friend/schema'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter'

const FriendApi = {
  async getRecommendationFriendList(): Promise<
    FERecommendationFriendSingleResponseType[]
  > {
    const res = await _axios({
      url: '/friend/recommendation',
      responseSchema: friendRecommendationListSchema
    })

    return transformObjectKeyFromSnakeToCamel(
      res
    ) as FERecommendationFriendSingleResponseType[]
  }
}

export default FriendApi
