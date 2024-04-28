import LoginForm from '@/components/login/LoginForm'
import SignUp from '@/components/login/SignUp'
import { useState } from 'react'

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false)

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
