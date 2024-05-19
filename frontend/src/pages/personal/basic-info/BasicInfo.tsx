import { FC } from 'react'
import Cover from '@/pages/personal/basic-info/Cover'
import Detail from '@/pages/personal/basic-info/detail/Detail'
import FunctionTabs from '@/pages/personal/basic-info/function-tabs/FunctionTabs'

interface BasicInfoProps {}

const BasicInfo: FC<BasicInfoProps> = () => {
  return (
    <div className='w-full bg-white shadow'>
      <div className='w-11/12 mx-auto'>
        <Cover />
        <div className='w-11/12 mx-auto'>
          <Detail />
          <FunctionTabs />
        </div>
      </div>
    </div>
  )
}

export default BasicInfo
