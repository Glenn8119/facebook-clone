import Input from '@/components/Input'
import Button from '@/components/Button'
import { ButtonVariant } from '@/types/component/input'
import { SetStateType } from '@/types/common'
import { ChangeEvent, FC } from 'react'
import { LoginFormType, loginFormSchema } from '@/schema/validation/login'
import useForm from '@/hooks/useForm'

type LoginFormProps = {
  setShowSignUp: SetStateType<boolean>
}

const initFormData = {
  account: '',
  password: ''
}

const LoginForm: FC<LoginFormProps> = ({ setShowSignUp }) => {
  const onSubmit = (formData: LoginFormType) => {
    console.log(formData)
  }

  const { formData, setFormData, submit, error } = useForm<LoginFormType>(
    {
      ...initFormData
    },
    loginFormSchema,
    onSubmit
  )

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement

    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className='w-96 p-5 shadow-lg rounded-lg bg-white flex flex-col items-center'>
      <Input
        value={formData.account}
        name='account'
        placeholder='帳號'
        className='mb-3 text-lg'
        onChange={onInputChange}
      />
      <div>{error?.account?._errors}</div>
      <Input
        value={formData.password}
        name='password'
        placeholder='密碼'
        className='mb-4 text-lg'
        onChange={onInputChange}
      />
      <div>{error?.password?._errors}</div>
      <Button className='text-lg mb-8' onClick={() => submit()}>
        登入
      </Button>
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
