import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { ButtonVariant } from '@/types/component/button'
import { SetStateType } from '@/types/common'
import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { LoginFormType, loginFormSchema } from '@/schema/validation/login'
import useForm from '@/hooks/useForm'
import ErrorMessage from '@/components/form/ErrorMessage'
import FormGroup from '@/components/form/FormGroup'
import useLogin from '@/hooks/api/useLogin'
import FullScreenLoading from '@/components/FullScreenLoading'

type LoginFormProps = {
  setShowSignUp: SetStateType<boolean>
}

const initFormData = {
  account: '',
  password: ''
}

const LoginForm: FC<LoginFormProps> = ({ setShowSignUp }) => {
  const { mutateAsync: login, isPending } = useLogin()

  const onSubmit = async (formData: LoginFormType) => {
    await login(formData)
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

  const onKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    }
  }

  return (
    <>
      <div className='w-96 p-5 shadow-lg rounded-lg bg-white flex flex-col items-center'>
        <FormGroup className='mb-3'>
          <Input
            onKeyUp={onKeyup}
            value={formData.account}
            name='account'
            placeholder='帳號'
            className='text-lg'
            onChange={onInputChange}
          />
          <ErrorMessage messageList={error?.account?._errors} />
        </FormGroup>
        <FormGroup className='mb-3'>
          <Input
            onKeyUp={onKeyup}
            value={formData.password}
            type='password'
            name='password'
            placeholder='密碼'
            className='text-lg font-[caption]'
            onChange={onInputChange}
          />
          <ErrorMessage messageList={error?.password?._errors} />
        </FormGroup>
        <Button className='text-lg mb-8' onClick={submit}>
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
      {isPending ? <FullScreenLoading /> : null}
    </>
  )
}

export default LoginForm
