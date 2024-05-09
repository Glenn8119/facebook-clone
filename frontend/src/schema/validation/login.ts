import { z } from 'zod'

export const loginFormSchema = z.object({
  account: z.string().min(8).max(20),
  password: z.string().min(8).max(20)
})

export const signUpFormSchema = loginFormSchema.extend({
  username: z.string().min(8).max(50)
})

export type LoginFormType = z.infer<typeof loginFormSchema>
export type SignUpFormType = z.infer<typeof signUpFormSchema>
