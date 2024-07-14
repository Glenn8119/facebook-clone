import useUserContext from '@/hooks/useUserContext'
import { useQueryClient } from '@tanstack/react-query'

const useLogout = () => {
  const { dispatch } = useUserContext()
  const queryClient = useQueryClient()

  const logout = () => {
    dispatch({ type: 'logOut' })
    queryClient.clear()
    localStorage.clear()
  }

  return logout
}

export default useLogout
