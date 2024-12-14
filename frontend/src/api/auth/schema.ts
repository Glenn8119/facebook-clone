import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'
import { z } from 'zod'

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string()
})

export const signUpResponseSchema = z.object({
  account: z.string(),
  name: z.string(),
  avatar_image: z.string()
})

export const userDetailResponseSchema = signUpResponseSchema.extend({
  id: z.string().uuid()
})

export const refreshTokenResponseSchema = loginResponseSchema

type LoginResponseType = z.infer<typeof loginResponseSchema>
type RefreshResponseSchema = z.infer<typeof refreshTokenResponseSchema>
type UserDetailResponseSchema = z.infer<typeof userDetailResponseSchema>

export type FELoginResponseType =
  TransformObjectKeyFromSnakeToCamel<LoginResponseType>

export type FERefreshTokenResponseType =
  TransformObjectKeyFromSnakeToCamel<RefreshResponseSchema>

export type FEUserDetailResponseSchema =
  TransformObjectKeyFromSnakeToCamel<UserDetailResponseSchema>
