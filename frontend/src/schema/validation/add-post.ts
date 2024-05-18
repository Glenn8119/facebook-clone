import { z } from 'zod'

export const postFormSchema = z.object({
  content: z.string().max(10, { message: '長度最多為 1000' })
})

export type PostFormType = z.infer<typeof postFormSchema>
