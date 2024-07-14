import Avatar from '@/components/Avatar'
// import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import { Post } from '@/types/api/post'
import { FC } from 'react'

type PostUserInfoProps = {
  post: Post
  createAt: string
}

const PostUserInfo: FC<PostUserInfoProps> = ({ post, createAt }) => {
  return (
    // <div className='flex'>
    //   <UserOverviewPopover
    //     userId={post.userId}
    //     addFriend && addFriend(av)
    //     name={post.poster}
    //   >
    //     <Avatar className='mr-2' />
    //     <div>
    //       <div className='font-bold cursor-pointer hover:underline'>{post.poster}</div>
    //       <div className='text-gray-500 text-sm'>{createAt}</div>
    //     </div>
    //   </UserOverviewPopover>
    //   <UserOverviewPopover
    //         key={avatarInfo.id}
    //         userId={avatarInfo.id}
    //         addFriend={() => addFriend && addFriend(avatarInfo.id)}
    //         name={avatarInfo.name}
    //         friendStatus={avatarInfo.friendStatus}
    //         commonFriendList={avatarInfo.commonFriendList}
    //       >
    //         <Avatar
    //           style={zIndexStyle}
    //           imgUrl={avatarInfo.imgUrl}
    //           className={cn}
    //         />
    //       </UserOverviewPopover>
    // </div>

    <div className='flex'>
      <Avatar className='mr-2' />
      <div>
        <div className='font-bold cursor-pointer hover:underline'>
          {post.poster}
        </div>
        <div className='text-gray-500 text-sm'>{createAt}</div>
      </div>
    </div>
  )
}

export default PostUserInfo
