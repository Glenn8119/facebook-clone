import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import useUserContext from '@/hooks/useUserContext'
import getFriendStatus from '@/utils/freindsStatus'

const useFetchUserFriendList = (userId: string) => {
  const {
    value: { id: selfId }
  } = useUserContext()

  const { friendList: userFriendList } = useGetFriendList(userId)
  const { friendList: selfFriendList } = useGetFriendList(selfId)

  if (!userFriendList || !selfFriendList) {
    return {
      friendList: null
    }
  }

  const friendList = userFriendList.map((friend) => ({
    ...friend,
    friendStatus: getFriendStatus({ selfFriendList, userId: friend.id, selfId })
  }))

  return { friendList }
}

export default useFetchUserFriendList
