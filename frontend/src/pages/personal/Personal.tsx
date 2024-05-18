import { FC } from 'react'
import BasicInfo from '@/pages/personal/basic-info/BasicInfo'
import FriendArea from '@/pages/personal/friend-area/FriendArea'
import PostArea from '@/components/common/post-area/PostArea'

const PersonalPage: FC = () => {
  return (
    <div className='w-full'>
      <BasicInfo />
      <div className='flex gap-4 w-4/5 m-auto'>
        <FriendArea />
        <PostArea />
      </div>
    </div>
  )
}

export default PersonalPage
