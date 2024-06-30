import FriendArea from './friend-area/FriendArea'
import PostArea from '@/components/common/post-area/PostArea'

const ProfilePost = () => {
  return (
    <div className='flex justify-center gap-4'>
      <FriendArea />
      <PostArea />
    </div>
  )
}

export default ProfilePost
