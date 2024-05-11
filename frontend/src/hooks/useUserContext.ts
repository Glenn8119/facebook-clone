import { UserContext } from '@/context/UserContextProvider'
import { useContext } from 'react'

const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('UserContext must be inside UserContextProvider.')
  }

  return context
}

export default useUserContext
