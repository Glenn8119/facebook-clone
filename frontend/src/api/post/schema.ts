import { TransformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'

import { z } from 'zod'

import { userSchema } from '@/api/user/schema'

export const commentSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  content: z.string(),
  poster: z.string(),
  poster_avatar_image: z.string().nullable(),
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
  liker_avatar_image: z.string().nullable(),
  is_friend: z.boolean()
})

export const getSinglePostResponseSchema = createPostResponseSchema.extend({
  liker_list: z.array(likerSchema),
  poster_avatar_image: z.string().nullable(),
  poster: z.string()
})

export const getPostResponseSchema = z.object({
  page: z.number(),
  page_size: z.number(),
  total: z.number(),
  result: z.array(getSinglePostResponseSchema)
})

export const getPostCommentResponseSchema = z.object({
  page: z.number(),
  page_size: z.number(),
  total: z.number(),
  result: z.array(commentSchema)
})

type CreatePostResponseType = z.infer<typeof createPostResponseSchema>
type EditPostResponseType = z.infer<typeof editPostResponseSchema>
type GetPostResponseType = z.infer<typeof getPostResponseSchema>
type GetPostCommentResponseType = z.infer<typeof getPostCommentResponseSchema>
type GetSinglePostResponseType = z.infer<typeof getSinglePostResponseSchema>
type LikerType = z.infer<typeof likerSchema>
type CommentType = z.infer<typeof commentSchema>
export type FECreatePostResponseType =
  TransformObjectKeyFromSnakeToCamel<CreatePostResponseType>
export type FEEditPostResponseType =
  TransformObjectKeyFromSnakeToCamel<EditPostResponseType>
export type FEGetPostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetPostResponseType>
export type FEGetPostCommentResponseType =
  TransformObjectKeyFromSnakeToCamel<GetPostCommentResponseType>
export type FEGetSinglePostResponseType =
  TransformObjectKeyFromSnakeToCamel<GetSinglePostResponseType>
export type FELikerType = TransformObjectKeyFromSnakeToCamel<LikerType>
export type FECommentType = TransformObjectKeyFromSnakeToCamel<CommentType>
