import FullScreenLoading from '@/components/FullScreenLoading'
import Post from '@/components/common/post-area/post-list/post/Post'
import Button from '@/components/form/Button'
import useFetchPostListWithLikerFriendStatus from '@/hooks/api/queries/useFetchPostListWithLikerFriendStatus'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

type PostListProps = {
  userId?: string
}

const PostList = ({ userId }: PostListProps) => {
  const {
    postList,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useFetchPostListWithLikerFriendStatus(userId)

  useInfiniteScroll(() => !isFetchingNextPage && fetchNextPage())

  if (!postList || isPending) {
    return <FullScreenLoading />
  }

  return (
    <div>
      <Button
        disabled={!hasNextPage}
        onClick={() => !isFetchingNextPage && fetchNextPage()}
      >
        next page
      </Button>
      {postList.map((post) => (
        <Post className='mb-3' key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
