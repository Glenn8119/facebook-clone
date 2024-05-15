import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import AddPost from '@/pages/home-page/post-area/add-post/AddPost'
import PostList from '@/pages/home-page/post-area/post-list/PostList'

interface PostAreaProps {
  className: string
}

const PostArea: FC<PostAreaProps> = ({ className }) => {
  const cn = twMerge('p-4', className)

  return (
    <div className={cn}>
      <AddPost />
      <PostList />
    </div>
  )
}

export default PostArea
