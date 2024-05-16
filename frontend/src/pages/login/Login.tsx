import LoginForm from '@/pages/login/LoginForm'
import SignUp from '@/pages/login/SignUp'
import useUserContext from '@/hooks/useUserContext'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const userContext = useUserContext()
  const [showSignUp, setShowSignUp] = useState(false)

  if (userContext.value.token) {
    return <Navigate to='/' />
  }

  return (
    <>
      <div className='flex justify-center items-center h-dvh'>
        <div className='w-108 mr-20'>
          <div className='text-blue-600 text-6xl font-bold mb-2'>FaceLook</div>
          <div className='text-2xl'>
            Connect with friends and the world around you on FaceLook.
          </div>
        </div>
        <LoginForm setShowSignUp={setShowSignUp} />
      </div>
      {showSignUp ? <SignUp setShowSignUp={setShowSignUp} /> : null}
    </>
  )
}

export default Login
