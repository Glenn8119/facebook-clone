const getFriendStatsu = ({
  selfId,
  userId,
  selfFriendList
}: {
  selfId: string
  userId: string
  selfFriendList: { id: string }[]
}) => {
  if (selfId === userId) {
    return null
  }

  return !!selfFriendList.find((friend) => friend.id === selfId)
}

export default getFriendStatsu
