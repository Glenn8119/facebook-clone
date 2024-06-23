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
  )
})

export const friendRecommendationListSchema = z.array(friendSchema)
export const friendListSchema = z.array(friendSchema)
export const addFriendReponseSchema = friendSchema.pick({ id: true })

type RecommendationFriendSingleResponseType = z.infer<typeof friendSchema>
type FriendSingleResponseType = z.infer<typeof friendSchema>
type AddFriendReponseSchema = z.infer<typeof addFriendReponseSchema>

export type FERecommendationFriendSingleResponseType =
  TransformObjectKeyFromSnakeToCamel<RecommendationFriendSingleResponseType>
export type FEAddFriendReponseSchema =
  TransformObjectKeyFromSnakeToCamel<AddFriendReponseSchema>
export type FEFriendSingleResponseType =
  TransformObjectKeyFromSnakeToCamel<FriendSingleResponseType>
