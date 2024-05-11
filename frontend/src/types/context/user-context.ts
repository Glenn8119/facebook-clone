export type UserContextType = {
  username: string
  token: string
}

export type UserReducerActionType =
  | { type: 'login'; payload: UserContextType }
  | { type: 'logOut' }
