import { FC } from 'react'
import Cover from '@/pages/profile/basic-info/Cover'
import Detail from '@/pages/profile/basic-info/detail/Detail'
import FunctionTabs from '@/pages/profile/basic-info/function-tabs/FunctionTabs'

interface BasicInfoProps {}

const BasicInfo: FC<BasicInfoProps> = () => {
  return (
    <div className='w-full bg-white shadow'>
      <div className='w-full max-w-312 mx-auto'>
        <Cover />
      </div>
      <div className='w-9/12 mx-auto'>
        <Detail />
        <FunctionTabs />
      </div>
    </div>
  )
}

export default BasicInfo
