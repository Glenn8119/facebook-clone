import { FC } from 'react'
import BasicInfo from '@/pages/personal/basic-info/BasicInfo'
import { Outlet } from 'react-router-dom'

const PersonalPage: FC = () => {
  return (
    <div className='w-full'>
      <BasicInfo />
      <Outlet />
    </div>
  )
}

export default PersonalPage
