import { z } from 'zod'

export const loginFormSchema = z.object({
  account: z.string().min(8).max(20),
  password: z.string().min(8)
})

export type LoginFormType = z.infer<typeof loginFormSchema>
