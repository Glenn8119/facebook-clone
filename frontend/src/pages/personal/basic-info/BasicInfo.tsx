import { FC } from 'react'
import Cover from '@/pages/personal/basic-info/Cover'

interface BasicInfoProps {}

const BasicInfo: FC<BasicInfoProps> = () => {
  return (
    <div className='w-full bg-white shadow'>
      <Cover />
    </div>
  )
}

export default BasicInfo
