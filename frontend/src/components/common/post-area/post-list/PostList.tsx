import { FC } from 'react'
import Post from '@/components/common/post-area/post-list/Post'

interface PostListProps {}

const PostList: FC<PostListProps> = () => {
  return (
    <div>
      {[1, 2, 3].map((num) => (
        <Post key={num} />
      ))}
    </div>
  )
}

export default PostList
