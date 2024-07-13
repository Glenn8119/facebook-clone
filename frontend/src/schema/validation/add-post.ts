import { z } from 'zod'

export const postFormSchema = z.object({
  content: z.string().max(1000, { message: '長度最多為 1000' })
})
export const commentFormSchema = z.object({
  content: z.string().max(1000, { message: '長度最多為 1000' })
})

export type PostFormType = z.infer<typeof postFormSchema>
export type PostCommentFormType = z.infer<typeof commentFormSchema>
