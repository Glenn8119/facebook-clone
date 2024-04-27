import Input from '@/components/Input'
import Button from '@/components/Button'
import { ButtonVariant } from '@/types/component/input'

const LoginForm = () => {
  return (
    <div className='w-96 p-5 shadow-lg rounded-lg bg-white flex flex-col items-center'>
      <Input placeholder='account' className='mb-3 text-lg' />
      <Input placeholder='password' className='mb-4 text-lg' />
      <Button className='text-lg mb-8'>Login</Button>
      <div className='border self-stretch mb-8'></div>
      <Button variant={ButtonVariant.SECONDARY} className='text-lg w-32'>
        建立新帳號
      </Button>
    </div>
  )
}

export default LoginForm
