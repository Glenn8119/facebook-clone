export type LoginRequestBody = { account: string; password: string }
export type SignUpRequestBody = { name: string } & LoginRequestBody
