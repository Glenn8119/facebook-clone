import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  id: z.string().uuid()
})

// TODO: add additional user data
export const userDetailSchema = userSchema.extend({
  common_friend_list: z.array(userSchema)
})

export const userOverviewSchema = userSchema.extend({
  common_friend_list: z.array(userSchema)
})

type UserDetailReponseType = z.infer<typeof userDetailSchema>
type UserOverviewType = z.infer<typeof userOverviewSchema>

export type FEUserDetailReponseType =
  TransformObjectKeyFromSnakeToCamel<UserDetailReponseType>

export type FEUserOverviewType =
  TransformObjectKeyFromSnakeToCamel<UserOverviewType>
