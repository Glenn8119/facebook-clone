export type UserContextType = {
  account: string
  token: string
}

export type UserReducerActionType =
  | { type: 'login'; payload: UserContextType }
  | { type: 'logOut' }
