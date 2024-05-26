import { z } from 'zod'

export const loginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string()
})

export const signUpResponseSchema = z.object({
  account: z.string(),
  name: z.string()
})

export type LoginResponseType = z.infer<typeof loginResponseSchema>
export type SignUpResponseType = z.infer<typeof signUpResponseSchema>
