import FunctionList from '@/pages/home-page/FunctionList'
import PostArea from '@/components/common/post-area/PostArea'
import RecommendationFriendList from './recommendation-friend-list/RecommendationFriendList'

const HomePage = () => {
  return (
    <div className='flex gap-4'>
      <FunctionList className='min-w-72 basis-1/4 sticky top-14' />
      <PostArea className='basis-1/2' />
      <RecommendationFriendList className='basis-1/4 h-[calc(100dvh-56px)] p-4 sticky top-14' />
    </div>
  )
}

export default HomePage
