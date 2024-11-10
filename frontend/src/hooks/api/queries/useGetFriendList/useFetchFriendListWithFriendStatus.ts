import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import useUserContext from '@/hooks/useUserContext'
import getFriendStatus from '@/utils/freindsStatus'

const useFetchFriendListWithFriendStatus = (userId: string) => {
  const {
    value: { id: selfId }
  } = useUserContext()

  const { friendList: userFriendList } = useGetFriendList(userId)

  if (!userFriendList) {
    return {
      friendList: null
    }
  }

  const friendList = userFriendList.map((friend) => ({
    ...friend,
    friendStatus: getFriendStatus({
      isFriend: friend.isFriend,
      userId: friend.id,
      selfId
    })
  }))

  return { friendList }
}

export default useFetchFriendListWithFriendStatus
