import Post from '@/components/common/post-area/post-list/post/Post'
import useGetPostList from '@/hooks/api/useGetPostList'

const PostList = () => {
  const { postList } = useGetPostList()

  if (!postList) {
    return null
  }

  return (
    <div>
      {postList.map((post) => (
        // TODO: replace key with poster when api is ready
        <Post className='mb-3' key={post.content} post={post} />
      ))}
    </div>
  )
}

export default PostList
