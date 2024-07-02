import useGetFriendList from '@/hooks/api/useGetFriendList'
import useUserContext from '@/hooks/useUserContext'

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

  const isUserSelf = userId === selfId

  const friendList = userFriendList.map((friend) => ({
    ...friend,
    isFriend: isUserSelf
      ? true
      : !!selfFriendList.find((selfFriend) => friend.id === selfFriend.id)
  }))

  return { friendList }
}

export default useFetchUserFriendList
