import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import AddPost from '@/components/common/post-area/add-post/AddPost'
import PostList from '@/components/common/post-area/post-list/PostList'

type PostAreaProps = {
  className?: string
  userId?: string
}

const PostArea: FC<PostAreaProps> = ({ className, userId }) => {
  const cn = twMerge('basis-3/5 min-w-125', className)

  return (
    <div className={cn}>
      <AddPost />
      <PostList userId={userId} />
    </div>
  )
}

export default PostArea
