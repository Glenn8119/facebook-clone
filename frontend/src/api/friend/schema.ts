import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter'
import { z } from 'zod'

const friendSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  common_friend_list: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  ),
  is_friend: z.boolean()
})

export const friendRecommendationListSchema = z.array(friendSchema)

type RecommendationFriendSingleResponseType = z.infer<typeof friendSchema>

export type FERecommendationFriendSingleResponseType =
  TransformObjectKeyFromSnakeToCamel<RecommendationFriendSingleResponseType>
