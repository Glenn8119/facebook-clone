import FunctionList from '@/pages/home-page/FunctionList'
import PostArea from '@/components/common/post-area/PostArea'
import { useContext, useEffect } from 'react'
import { PostContext } from '@/context/PostContextProvider'
import PostApi from '@/api/post'
import RecommendationFriendList from './recommendation-friend-list/RecommendationFriendList'

const HomePage = () => {
  const { dispatch } = useContext(PostContext)

  useEffect(() => {
    const fetch = async () => {
      const postList = await PostApi.getPostList()
      dispatch({ type: 'getPostList', payload: postList })
    }

    fetch()
  }, [dispatch])

  return (
    <div className='flex gap-4'>
      <FunctionList className='basis-1/4 sticky top-14' />
      <PostArea className='basis-1/2' />
      <RecommendationFriendList className='basis-1/4 h-[calc(100dvh-56px)] p-4 sticky top-14' />
    </div>
  )
}

export default HomePage
