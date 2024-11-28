import { Nullable } from '@/types/common'

export type LoginRequestBody = { account: string; password: string }
export type RefreshTokenRequestBody = { refresh_token: string }
export type SignUpRequestBody = { name: string } & LoginRequestBody
export type UpdateUserDetailRequestBody = {
  current_residence: Nullable<string>
  hometown: Nullable<string>
  bio: Nullable<string>
  company: Nullable<string>
  avatar_image: Nullable<string>
  cover_image: Nullable<string>
}
