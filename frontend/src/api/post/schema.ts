import { z } from 'zod'

export const postResponseSchema = z.object({
  content: z.string()
})

export type PostResponseType = z.infer<typeof postResponseSchema>
