import { SetStateType } from '@/types/common'
import { ChangeEvent, FC } from 'react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import { ButtonVariant } from '@/types/component/button'
import useForm from '@/hooks/useForm'
import { SignUpFormType, signUpFormSchema } from '@/schema/validation/login'
import FormGroup from '@/components/form/FormGroup'
import ErrorMessage from '@/components/form/ErrorMessage'
import Mask from '@/components/Mask'
import { MdClose } from 'react-icons/md'
import FullScreenLoading from '@/components/FullScreenLoading'
import useSignUp from '@/hooks/api/useSignUp'

type SignUpFormProps = {
  setShowSignUp: SetStateType<boolean>
}

const initFormData = {
  username: '',
  account: '',
  password: ''
}

const SignUp: FC<SignUpFormProps> = ({ setShowSignUp }) => {
  const {
    mutateAsync,
    isPending: isSignUpPending,
    isLoginPending
  } = useSignUp()

  const onSubmit = async ({ username, account, password }: SignUpFormType) => {
    await mutateAsync({
      account,
      name: username,
      password
    })
  }

  const {
    formData,
    setFormData,
    submit: signUp,
    error
  } = useForm<SignUpFormType>({ ...initFormData }, signUpFormSchema, onSubmit)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement

    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <>
      <Mask>
        <div className='relative w-108 shadow-lg bg-white'>
          <MdClose
            className='absolute top-3 right-3 cursor-pointer'
            size={24}
            onClick={() => setShowSignUp(false)}
          />
          <div className=' p-3 border-b border-gray-200'>
            <div className='text-4xl font-bold'>註冊</div>
            <p className='text-gray-600'>快速又簡單。</p>
          </div>
          <form className='p-4 pb-6'>
            <FormGroup className='mb-3'>
              <Input
                onChange={onInputChange}
                value={formData.username}
                name='username'
                placeholder='姓名'
              />
              <ErrorMessage messageList={error?.username?._errors} />
            </FormGroup>
            <FormGroup className='mb-3'>
              <Input
                onChange={onInputChange}
                value={formData.account}
                name='account'
                placeholder='帳號'
              />
              <ErrorMessage messageList={error?.account?._errors} />
            </FormGroup>
            <FormGroup className='mb-4'>
              <Input
                onChange={onInputChange}
                value={formData.password}
                name='password'
                placeholder='密碼'
              />
              <ErrorMessage messageList={error?.account?._errors} />
            </FormGroup>
            <p className='text-xs text-gray-500 mb-6'>
              點擊「註冊」即表示你同意我們的《服務條款》、《隱私政策》和《Cookie
              政策》。你可能會收到我們的簡訊通知，而且可以隨時選擇停止接收。
            </p>
            <div className='text-center'>
              <Button
                type='button'
                variant={ButtonVariant.SECONDARY}
                className='font-bold w-48 h-9 text-lg'
                onClick={signUp}
              >
                註冊
              </Button>
            </div>
          </form>
        </div>
      </Mask>
      {isSignUpPending || isLoginPending ? <FullScreenLoading /> : null}
    </>
  )
}

export default SignUp
