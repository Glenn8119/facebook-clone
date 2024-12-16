import { FC } from 'react'

import Avatar from '@/components/Avatar'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'

import { Post } from '@/types/api/post'

type PostUserInfoProps = {
  post: Post
  createAt: string
}

const PostUserInfo: FC<PostUserInfoProps> = ({ post, createAt }) => {
  return (
    <div className='flex'>
      <LazyLoadUserOverviewPopover userId={post.userId}>
        <Avatar
          className='mr-2 cursor-pointer'
          imgUrl={post.posterAvatarImage}
        />
      </LazyLoadUserOverviewPopover>
      <div>
        <LazyLoadUserOverviewPopover userId={post.userId}>
          <div className='font-bold cursor-pointer hover:underline'>
            {post.poster}
          </div>
        </LazyLoadUserOverviewPopover>
        <div className='text-gray-500 text-sm'>{createAt}</div>
      </div>
    </div>
  )
}

export default PostUserInfo
