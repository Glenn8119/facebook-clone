export type LoginRequestBody = { account: string; password: string }
export type RefreshTokenRequestBody = { refresh_token: string }
export type SignUpRequestBody = { name: string } & LoginRequestBody
