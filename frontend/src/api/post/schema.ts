import { z } from 'zod'

export const createPostResponseSchema = z.object({
  content: z.string()
})

export const getPostResponseSchema = z.array(createPostResponseSchema)

export type CreatePostResponseType = z.infer<typeof createPostResponseSchema>
export type GetPostResponseType = z.infer<typeof getPostResponseSchema>
