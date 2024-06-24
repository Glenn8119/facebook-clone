import { FC } from 'react'
import FriendArea from './friend-area/FriendArea'
import PostArea from '@/components/common/post-area/PostArea'

interface PersonalPostProps {}

const PersonalPost: FC<PersonalPostProps> = () => {
  return (
    <div className='flex justify-center gap-4'>
      <FriendArea />
      <PostArea />
    </div>
  )
}

export default PersonalPost
