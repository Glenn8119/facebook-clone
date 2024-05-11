import LoginForm from '@/components/login/LoginForm'
import SignUp from '@/components/login/SignUp'
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
      <div className='flex flex-col justify-center items-center h-dvh bg-slate-100'>
        <div className='text-blue-600 text-4xl font-bold mb-6'>FaceLook</div>
        <LoginForm setShowSignUp={setShowSignUp} />
      </div>
      {showSignUp ? <SignUp setShowSignUp={setShowSignUp} /> : null}
    </>
  )
}

export default Login
