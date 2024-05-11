import { FC, ReactNode, useReducer, Dispatch, createContext } from 'react'
import {
  UserContextType,
  UserReducerActionType
} from '@/types/context/user-context'

export const UserContext = createContext<{
  value: UserContextType
  dispatch: Dispatch<UserReducerActionType>
}>({ value: { account: '', token: '' }, dispatch: () => {} })

const userReducer = (_: UserContextType, action: UserReducerActionType) => {
  switch (action.type) {
    case 'login':
      return action.payload
    case 'logOut':
      return { account: '', token: '' }
  }
}

type UserContextProviderType = {
  children: ReactNode
}

const UserContextProvider: FC<UserContextProviderType> = ({ children }) => {
  const [userValue, dispatch] = useReducer(userReducer, {
    token: '',
    account: ''
  })

  return (
    <UserContext.Provider value={{ value: userValue, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
