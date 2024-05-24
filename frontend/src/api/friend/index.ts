import _axios from '@/api/_axios'
import {
  FriendResponseType,
  friendRecommendationSchema
} from '@/api/friend/schema'

const FriendApi = {
  async getRecommendationFriend(): Promise<FriendResponseType> {
    return _axios({
      url: '/friend/recommendation',
      responseSchema: friendRecommendationSchema
    })
  }
}

export default FriendApi
