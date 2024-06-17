import { FC } from 'react'
import BasicInfo from '@/pages/personal/basic-info/BasicInfo'
import { Outlet } from 'react-router-dom'

const PersonalPage: FC = () => {
  return (
    <div className='w-full'>
      <BasicInfo />
      <div className='w-10/12 m-auto py-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default PersonalPage
