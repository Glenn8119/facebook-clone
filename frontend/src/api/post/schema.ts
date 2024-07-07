import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'
import { z } from 'zod'
import { userOverviewSchema } from '@/api/user/schema'

export const commentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  poster: z.string()
})

export const createPostResponseSchema = z.object({
  content: z.string(),
  id: z.string().uuid(),
  comment_list: z.array(commentSchema),
  liker_list: z.array(userOverviewSchema),
  poster: z.string(),
  user_id: z.string().uuid(),
  created_at: z.string()
})

export const getPostResponseSchema = z.array(createPostResponseSchema)
export const getSinglePostResponseSchema = createPostResponseSchema

type CreatePostResponseType = z.infer<typeof createPostResponseSchema>
type GetPostResponseType = z.infer<typeof getPostResponseSchema>
type GetSinglePostResponseType = z.infer<typeof getSinglePostResponseSchema>
export type FECreatePostResponseType =
  TransformObjectKeyFromSnakeToCamel<CreatePostResponseType>
export type FEGetPostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetPostResponseType>
export type FEGetSinglePostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetSinglePostResponseType>
