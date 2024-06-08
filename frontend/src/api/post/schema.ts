import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter'
import { z } from 'zod'

export const createPostResponseSchema = z.object({
  content: z.string()
})

export const getPostResponseSchema = z.array(createPostResponseSchema)

type CreatePostResponseType = z.infer<typeof createPostResponseSchema>
type GetPostResponseType = z.infer<typeof getPostResponseSchema>
export type FECreatePostResponseType =
  TransformObjectKeyFromSnakeToCamel<CreatePostResponseType>
export type FEGetPostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetPostResponseType>
