import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import useUserContext from '@/hooks/useUserContext'
import { FriendStatus } from '@/types/common'

const useGetCommonFriendList = (userId: string, enabled?: boolean) => {
  const {
    value: { id: selfId }
  } = useUserContext()

  const { friendList: userFriendList } = useGetFriendList(userId, !!enabled)
  const { friendList: selfFriendList } = useGetFriendList(selfId, !!enabled)

  if (!userFriendList || !selfFriendList || !enabled) {
    return {
      commonFriendList: null
    }
  }

  const selfFriendListIdSet = new Set(userFriendList.map((friend) => friend.id))

  const commonFriendList = userFriendList
    .filter((friend) => selfFriendListIdSet.has(friend.id))
    .map((friend) => ({
      ...friend,
      friendStatus: FriendStatus.IS_FRIEND
    }))

  return {
    commonFriendList
  }
}

export default useGetCommonFriendList
