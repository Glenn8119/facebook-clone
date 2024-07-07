import { FriendStatus } from '@/types/common'

const getFriendStatus = ({
  selfId,
  userId,
  selfFriendList
}: {
  selfId: string
  userId: string
  selfFriendList: { id: string }[]
}) => {
  if (selfId === userId) {
    return FriendStatus.IsSelf
  }

  return selfFriendList.find((friend) => friend.id === userId)
    ? FriendStatus.IsFriend
    : FriendStatus.IsNotFriend
}

export default getFriendStatus
