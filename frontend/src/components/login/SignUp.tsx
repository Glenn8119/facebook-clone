import { SetStateType } from '@/types/common'
import { FC } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { ButtonVariant } from '@/types/component/input'

type SignUpFormProps = {
  setShowSignUp: SetStateType<boolean>
}

const SignUp: FC<SignUpFormProps> = ({ setShowSignUp }) => {
  return (
    <div className='fixed bg-white/80 inset-0 w-dvw h-dvh flex items-center justify-center'>
      <div className='relative w-108 shadow-lg bg-white'>
        {/* TODO: replace X with real icon */}
        <div
          className='absolute top-3 right-3 cursor-pointer'
          onClick={() => setShowSignUp(false)}
        >
          X
        </div>
        <div className=' p-3 border-b border-gray-200'>
          <div className='text-4xl font-bold'>註冊</div>
          <p className='text-gray-600'>快速又簡單。</p>
        </div>
        <form className='p-4 pb-6'>
          <Input className='mb-3' placeholder='姓名' />
          <Input className='mb-3' placeholder='帳號' />
          <Input className='mb-4' placeholder='密碼' />
          <p className='text-xs text-gray-500 mb-6'>
            點擊「註冊」即表示你同意我們的《服務條款》、《隱私政策》和《Cookie
            政策》。你可能會收到我們的簡訊通知，而且可以隨時選擇停止接收。
          </p>
          <div className='text-center'>
            <Button
              variant={ButtonVariant.SECONDARY}
              className='font-bold w-48 h-9 text-lg'
            >
              註冊
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
