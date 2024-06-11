import { FC, ReactNode, useReducer, Dispatch, createContext } from 'react'
import {
  UserContextType,
  UserReducerActionType
} from '@/types/context/user-context'

export const UserContext = createContext<{
  value: UserContextType
  dispatch: Dispatch<UserReducerActionType>
}>({ value: { account: '', token: '', name: '' }, dispatch: () => {} })

const userReducer = (_: UserContextType, action: UserReducerActionType) => {
  switch (action.type) {
    case 'login':
      return action.payload
    case 'logOut':
      return { account: '', token: '', name: '' }
  }
}

type UserContextProviderType = {
  children: ReactNode
}

const localStorageUser = localStorage.getItem('user')
const initUserValue = localStorageUser
  ? JSON.parse(localStorageUser)
  : {
      token: '',
      account: '',
      name: ''
    }

const UserContextProvider: FC<UserContextProviderType> = ({ children }) => {
  const [userValue, dispatch] = useReducer(userReducer, initUserValue)

  return (
    <UserContext.Provider value={{ value: userValue, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
