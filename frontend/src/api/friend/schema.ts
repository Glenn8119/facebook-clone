import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'
import { z } from 'zod'
import { userOverviewSchema } from '@/api/user/schema'

const friendSchema = userOverviewSchema

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
