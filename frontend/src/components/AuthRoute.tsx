import useUserContext from '@/hooks/useUserContext'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '@/components/layout/header/Header'
import PostContextProvider from '@/context/PostContextProvider'

const AuthRoute: FC = () => {
  const userContext = useUserContext()

  if (!userContext.value.token) {
    return <Navigate to='/login' />
  }

  return (
    <div className='pt-14 w-dvw'>
      <Header />
      <PostContextProvider>
        <Outlet />
      </PostContextProvider>
    </div>
  )
}

export default AuthRoute
