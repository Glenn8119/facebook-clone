import { FC } from 'react'
import Post from '@/components/common/post-area/post-list/post/Post'
import { type Post as PostType } from '@/types/pages/home-page'

interface PostListProps {
  postList: PostType[]
}

const PostList: FC<PostListProps> = ({ postList }) => {
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
