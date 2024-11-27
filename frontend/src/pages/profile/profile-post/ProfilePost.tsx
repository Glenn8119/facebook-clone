import FriendArea from './friend-area/FriendArea'
import PostArea from '@/components/common/post-area/PostArea'
import { useSearchParams } from 'react-router-dom'
import IntroArea from './intro-area/IntroArea'

const ProfilePost = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  return (
    <div className='flex justify-center gap-4'>
      <div>
        <IntroArea className='mb-3' />
        <FriendArea />
      </div>
      <PostArea userId={userId} />
    </div>
  )
}

export default ProfilePost
