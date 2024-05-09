import { z } from 'zod'

export const loginFormSchema = z.object({
  account: z
    .string()
    .min(8, { message: '長度至少為 8' })
    .max(20, { message: '長度最多為 20' }),
  password: z
    .string()
    .min(8, { message: '長度至少為 8' })
    .max(20, { message: '長度最多為 20' })
})

export const signUpFormSchema = loginFormSchema.extend({
  username: z
    .string()
    .min(8, { message: '長度至少為 8' })
    .max(50, { message: '長度最多為 50' })
})

export type LoginFormType = z.infer<typeof loginFormSchema>
export type SignUpFormType = z.infer<typeof signUpFormSchema>
