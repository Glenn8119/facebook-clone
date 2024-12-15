import { FC, ReactNode, useReducer, Dispatch, createContext } from 'react'
import {
  UserContextType,
  UserReducerActionType
} from '@/types/context/user-context'

const userContextInitialValue = {
  account: '',
  accessToken: '',
  refreshToken: '',
  name: '',
  avatarImage: '',
  id: ''
}

export const UserContext = createContext<{
  value: UserContextType
  dispatch: Dispatch<UserReducerActionType>
}>({ value: { ...userContextInitialValue }, dispatch: () => {} })

const userReducer = (_: UserContextType, action: UserReducerActionType) => {
  switch (action.type) {
    case 'login':
      return action.payload
    case 'logOut':
      return { ...userContextInitialValue }
  }
}

type UserContextProviderType = {
  children: ReactNode
}

const localStorageUser = localStorage.getItem('user')
const initUserValue = localStorageUser
  ? JSON.parse(localStorageUser)
  : { ...userContextInitialValue }

const UserContextProvider: FC<UserContextProviderType> = ({ children }) => {
  const [userValue, dispatch] = useReducer(userReducer, initUserValue)

  return (
    <UserContext.Provider value={{ value: userValue, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
