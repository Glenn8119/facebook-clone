import { FC } from 'react'
import FriendArea from './friend-area/FriendArea'
import PostArea from '@/components/common/post-area/PostArea'

interface PersonalPostProps {}

const PersonalPost: FC<PersonalPostProps> = () => {
  return (
    <div className='flex gap-4 w-4/5 m-auto'>
      <FriendArea />
      <PostArea />
    </div>
  )
}

export default PersonalPost
