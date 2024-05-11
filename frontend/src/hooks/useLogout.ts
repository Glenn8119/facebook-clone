import useUserContext from '@/hooks/useUserContext'

const useLogout = () => {
  const { dispatch } = useUserContext()

  const logout = () => {
    dispatch({ type: 'logOut' })
    localStorage.clear()
  }

  return logout
}

export default useLogout
