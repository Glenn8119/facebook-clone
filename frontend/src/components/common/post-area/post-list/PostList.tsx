import Post from '@/components/common/post-area/post-list/post/Post'
import useFetchPostListWithLikerFriendStatus from '@/hooks/api/queries/useGetPostList/useFetchPostListWithLikerFriendStatus'

const PostList = () => {
  const { postList } = useFetchPostListWithLikerFriendStatus()

  if (!postList) {
    return null
  }

  return (
    <div>
      {postList.map((post) => (
        // TODO: replace key with poster when api is ready
        <Post className='mb-3' key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
