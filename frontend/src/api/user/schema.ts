import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter'
import { z } from 'zod'

export const loginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string()
})

export const signUpResponseSchema = z.object({
  account: z.string(),
  name: z.string()
})

type LoginResponseType = z.infer<typeof loginResponseSchema>

export type FELoginResponseType =
  TransformObjectKeyFromSnakeToCamel<LoginResponseType>
