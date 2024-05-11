import useUserContext from '@/hooks/useUserContext'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute: FC = () => {
  const userContext = useUserContext()

  if (!userContext.value.token) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}

export default AuthRoute
