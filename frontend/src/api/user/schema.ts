import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  avatar_image: z.string().nullable()
})

export const userOverviewSchema = userSchema.extend({
  is_friend: z.boolean(),
  common_friend_list: z.array(userSchema)
})

export const userProfileSchema = z.object({
  bio: z.string().nullable(),
  current_residence: z.string().nullable(),
  hometown: z.string().nullable(),
  company: z.string().nullable(),
  cover_image: z.string().nullable()
})

export const userDetailSchema = userOverviewSchema.merge(userProfileSchema)

type UserDetailReponseType = z.infer<typeof userDetailSchema>
type UserOverviewType = z.infer<typeof userOverviewSchema>
type UserProfileSchema = z.infer<typeof userProfileSchema>

export type FEUserDetailReponseType =
  TransformObjectKeyFromSnakeToCamel<UserDetailReponseType>

export type FEUserOverviewType =
  TransformObjectKeyFromSnakeToCamel<UserOverviewType>

export type FEUserProfileType =
  TransformObjectKeyFromSnakeToCamel<UserProfileSchema>
