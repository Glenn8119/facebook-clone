import { FC } from 'react'
import Post from '@/components/common/post-area/post-list/post/Post'

interface PostListProps {}

const PostList: FC<PostListProps> = () => {
  return (
    <div>
      {[1, 2, 3].map((num) => (
        <Post className='mb-3' key={num} />
      ))}
    </div>
  )
}

export default PostList
