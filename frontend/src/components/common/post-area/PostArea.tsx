import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import AddPost from '@/components/common/post-area/add-post/AddPost'
import PostList from '@/components/common/post-area/post-list/PostList'

interface PostAreaProps {
  className?: string
}

const PostArea: FC<PostAreaProps> = ({ className }) => {
  const cn = twMerge('basis-3/5 pt-4', className)

  return (
    <div className={cn}>
      <AddPost />
      <PostList />
    </div>
  )
}

export default PostArea
