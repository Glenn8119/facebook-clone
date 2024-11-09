import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'

import { z } from 'zod'

import { userSchema } from '@/api/user/schema'

export const commentSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  content: z.string(),
  poster: z.string(),
  poster_id: z.string().uuid()
})

export const createPostResponseSchema = z.object({
  content: z.string(),
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string()
})

export const editPostResponseSchema = createPostResponseSchema

const likerSchema = userSchema.extend({
  is_friend: z.boolean()
})

export const getSinglePostResponseSchema = createPostResponseSchema.extend({
  comment_list: z.array(commentSchema),
  liker_list: z.array(likerSchema),
  poster: z.string()
})

export const getPostResponseSchema = z.object({
  page: z.number(),
  page_size: z.number(),
  total: z.number(),
  result: z.array(getSinglePostResponseSchema)
})

type CreatePostResponseType = z.infer<typeof createPostResponseSchema>
type EditPostResponseType = z.infer<typeof editPostResponseSchema>
type GetPostResponseType = z.infer<typeof getPostResponseSchema>
type GetSinglePostResponseType = z.infer<typeof getSinglePostResponseSchema>
type LikerType = z.infer<typeof likerSchema>
export type FECreatePostResponseType =
  TransformObjectKeyFromSnakeToCamel<CreatePostResponseType>
export type FEEditPostResponseType =
  TransformObjectKeyFromSnakeToCamel<EditPostResponseType>
export type FEGetPostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetPostResponseType>
export type FEGetSinglePostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetSinglePostResponseType>
export type FELikerType = TransformObjectKeyFromSnakeToCamel<LikerType>
