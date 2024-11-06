import FullScreenLoading from '@/components/FullScreenLoading'
import Spin from '@/components/Spin'
import Post from '@/components/common/post-area/post-list/post/Post'
import useFetchPostListWithLikerFriendStatus from '@/hooks/api/queries/useFetchPostListWithLikerFriendStatus'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

type PostListProps = {
  userId?: string
}

const PostList = ({ userId }: PostListProps) => {
  const { postList, isPending, isFetchingNextPage, fetchNextPage } =
    useFetchPostListWithLikerFriendStatus(userId)

  useInfiniteScroll(() => !isFetchingNextPage && fetchNextPage())

  if (!postList || isPending) {
    return <FullScreenLoading />
  }

  return (
    <div>
      {postList.map((post) => (
        <Post className='mb-3' key={post.id} post={post} />
      ))}
      {isFetchingNextPage ? <Spin className='w-8 h-8 mt-2' /> : null}
    </div>
  )
}

export default PostList
