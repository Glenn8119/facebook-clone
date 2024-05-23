import { FC, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import AddPost from '@/components/common/post-area/add-post/AddPost'
import PostList from '@/components/common/post-area/post-list/PostList'
import { PostContext } from '@/context/PostContextProvider'

interface PostAreaProps {
  className?: string
}

const PostArea: FC<PostAreaProps> = ({ className }) => {
  const cn = twMerge('basis-3/5 pt-4 min-w-125', className)

  const { value } = useContext(PostContext)

  return (
    <div className={cn}>
      <AddPost />
      <PostList postList={value} />
    </div>
  )
}

export default PostArea
