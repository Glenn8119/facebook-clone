import useUserContext from '@/hooks/useUserContext'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '@/components/layout/header/Header'
import { ROUTES } from '@/constants/common'

const AuthRoute: FC = () => {
  const userContext = useUserContext()

  if (!userContext.value.token) {
    return <Navigate to={ROUTES.LOGIN} />
  }

  return (
    <div className='pt-14 w-dvw'>
      <Header />
      <Outlet />
    </div>
  )
}

export default AuthRoute
