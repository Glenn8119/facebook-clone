export type UserContextType = {
  account: string
  token: string
  name: string
  id: string
}

export type UserReducerActionType =
  | { type: 'login'; payload: UserContextType }
  | { type: 'logOut' }
