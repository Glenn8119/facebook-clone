import { FriendStatus } from '@/types/common'

const getFriendStatus = ({
  selfId,
  userId,
  isFriend
}: {
  selfId: string
  userId: string
  isFriend: boolean
}) => {
  if (selfId === userId) {
    return FriendStatus.IsSelf
  }

  return isFriend ? FriendStatus.IsFriend : FriendStatus.IsNotFriend
}

export default getFriendStatus
