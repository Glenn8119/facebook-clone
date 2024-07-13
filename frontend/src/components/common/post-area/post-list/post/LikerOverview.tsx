import { Post } from '@/types/api/post'
import { FriendStatus } from '@/types/common'
import { FC } from 'react'
import { MdThumbUp } from 'react-icons/md'

type LikerOverviewProps = { post: Post }

const LikerOverview: FC<LikerOverviewProps> = ({ post }) => {
  if (!post.likerList.length) return null

  const getText = () => {
    const friendList = post.likerList.filter(
      (liker) =>
        liker.friendStatus === FriendStatus.IsFriend ||
        liker.friendStatus === FriendStatus.IsSelf
    )
    if (!friendList.length) {
      return post.likerList.length.toString()
    }

    const order = [
      FriendStatus.IsSelf,
      FriendStatus.IsFriend,
      FriendStatus.IsNotFriend
    ]
    friendList.sort(
      (a, b) => order.indexOf(a.friendStatus) - order.indexOf(b.friendStatus)
    )

    const friendName = friendList[0].name
    const restPeople = post.likerList.length - 1
    return restPeople
      ? `${friendName}和其他${post.likerList.length - 1}人`
      : friendName
  }

  return (
    <>
      <div className='w-5 h-5 mr-1 cursor-pointer flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'>
        <MdThumbUp color='white' size={12} />
      </div>
      <span className='mr-auto text-15 text-gray-400 hover:underline cursor-pointer'>
        {getText()}
      </span>
    </>
  )
}

export default LikerOverview
