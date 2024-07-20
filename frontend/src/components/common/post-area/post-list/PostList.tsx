import FullScreenLoading from '@/components/FullScreenLoading'
import Post from '@/components/common/post-area/post-list/post/Post'
import useFetchPostListWithLikerFriendStatus from '@/hooks/api/queries/useGetPostList/useFetchPostListWithLikerFriendStatus'

type PostListProps = {
  userId?: string
}

const PostList = ({ userId }: PostListProps) => {
  const { postList, isPending } = useFetchPostListWithLikerFriendStatus(userId)

  if (!postList || isPending) {
    return <FullScreenLoading />
  }

  return (
    <div>
      {postList.map((post) => (
        <Post className='mb-3' key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
