import { FC, useState } from 'react'

import Avatar from '@/components/Avatar'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'

import { Post } from '@/types/api/post'

type PostUserInfoProps = {
  post: Post
  createAt: string
}

const PostUserInfo: FC<PostUserInfoProps> = ({ post, createAt }) => {
  const [isEnableLoadPopover, setEnableLoadPopover] = useState(false)
  return (
    <div className='flex'>
      <LazyLoadUserOverviewPopover
        isEnableQuery={isEnableLoadPopover}
        userId={post.userId}
        name={post.poster}
      >
        <Avatar
          className='mr-2 cursor-pointer'
          imgUrl={post.posterAvatarImage}
          onMouseEnter={() => setEnableLoadPopover(true)}
        />
      </LazyLoadUserOverviewPopover>
      <div>
        <LazyLoadUserOverviewPopover
          isEnableQuery={isEnableLoadPopover}
          userId={post.userId}
          name={post.poster}
        >
          <div
            className='font-bold cursor-pointer hover:underline'
            onMouseEnter={() => setEnableLoadPopover(true)}
          >
            {post.poster}
          </div>
        </LazyLoadUserOverviewPopover>
        <div className='text-gray-500 text-sm'>{createAt}</div>
      </div>
    </div>
  )
}

export default PostUserInfo
