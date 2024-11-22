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
    return FriendStatus.IS_SELF
  }

  return isFriend ? FriendStatus.IS_FRIEND : FriendStatus.IS_NOT_FRIEND
}

export default getFriendStatus
