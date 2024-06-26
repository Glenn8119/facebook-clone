import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter'
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  id: z.string().uuid()
})

export const userDetailSchema = userSchema.extend({
  common_friend_list: z.array(userSchema)
})

type UserDetailReponseType = z.infer<typeof userDetailSchema>

export type FEUserDetailReponseType =
  TransformObjectKeyFromSnakeToCamel<UserDetailReponseType>
