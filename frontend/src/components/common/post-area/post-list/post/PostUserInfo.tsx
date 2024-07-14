import Avatar from '@/components/Avatar'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
// import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import { Post } from '@/types/api/post'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'

type PostUserInfoProps = {
  post: Post
  createAt: string
}

const PostUserInfo: FC<PostUserInfoProps> = ({ post, createAt }) => {
  const [startLoadPopover, setStartLoadPopover] = useState(false)
  const {
    value: { id: selfId }
  } = useUserContext()
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()

  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
    }
  })

  return (
    <div className='flex'>
      <LazyLoadUserOverviewPopover
        startLoad={startLoadPopover}
        userId={post.userId}
        name={post.poster}
        addFriend={addFriend}
      >
        <Avatar
          className='mr-2 cursor-pointer'
          onMouseEnter={() => setStartLoadPopover(true)}
        />
      </LazyLoadUserOverviewPopover>
      <div>
        <LazyLoadUserOverviewPopover
          startLoad={startLoadPopover}
          userId={post.userId}
          name={post.poster}
          addFriend={addFriend}
        >
          <div
            className='font-bold cursor-pointer hover:underline'
            onMouseEnter={() => setStartLoadPopover(true)}
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
