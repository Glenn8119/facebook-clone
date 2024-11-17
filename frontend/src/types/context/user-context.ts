export type UserContextType = {
  account: string
  accessToken: string
  refreshToken: string
  name: string
  id: string
}

export type UserReducerActionType =
  | { type: 'login'; payload: UserContextType }
  | { type: 'logOut' }
