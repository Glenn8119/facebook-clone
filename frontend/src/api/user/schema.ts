import { z } from 'zod'

export const loginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string()
})

export type LoginResponseType = z.infer<typeof loginResponseSchema>
