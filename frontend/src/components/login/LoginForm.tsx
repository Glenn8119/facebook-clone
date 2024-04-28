import Input from '@/components/Input'
import Button from '@/components/Button'
import { ButtonVariant } from '@/types/component/input'
import { SetStateType } from '@/types/common'
import { FC } from 'react'

type LoginFormProps = {
  setShowSignUp: SetStateType<boolean>
}

const LoginForm: FC<LoginFormProps> = ({ setShowSignUp }) => {
  return (
    <div className='w-96 p-5 shadow-lg rounded-lg bg-white flex flex-col items-center'>
      <Input placeholder='帳號' className='mb-3 text-lg' />
      <Input placeholder='密碼' className='mb-4 text-lg' />
      <Button className='text-lg mb-8'>登入</Button>
      <div className='border self-stretch mb-8'></div>
      <Button
        variant={ButtonVariant.SECONDARY}
        className='text-lg w-32'
        onClick={() => setShowSignUp(true)}
      >
        建立新帳號
      </Button>
    </div>
  )
}

export default LoginForm
