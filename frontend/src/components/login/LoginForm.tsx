import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { ButtonVariant } from '@/types/component/input'
import { SetStateType } from '@/types/common'
import { ChangeEvent, FC } from 'react'
import { LoginFormType, loginFormSchema } from '@/schema/validation/login'
import useForm from '@/hooks/useForm'
import ErrorMessage from '@/components/form/ErrorMessage'
import FormGroup from '@/components/form/FormGroup'
import UserApi from '@/api/user'
import { useNavigate } from 'react-router-dom'
import useUserContext from '@/hooks/useUserContext'

type LoginFormProps = {
  setShowSignUp: SetStateType<boolean>
}

const initFormData = {
  account: '',
  password: ''
}

const LoginForm: FC<LoginFormProps> = ({ setShowSignUp }) => {
  const { dispatch } = useUserContext()
  const navigate = useNavigate()

  const onSubmit = async (formData: LoginFormType) => {
    const res = await UserApi.login(formData)
    dispatch({
      type: 'login',
      payload: { account: formData.account, token: res.access_token }
    })
    navigate('/')
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
      <FormGroup className='mb-3'>
        <Input
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
          value={formData.password}
          name='password'
          placeholder='密碼'
          className='text-lg'
          onChange={onInputChange}
        />
        <ErrorMessage messageList={error?.password?._errors} />
      </FormGroup>
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
