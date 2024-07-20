import useGetPostList from '@/hooks/api/queries/useGetPostList'
import useUserContext from '@/hooks/useUserContext'
import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import getFriendStatus from '@/utils/freindsStatus'
import { Post } from '@/types/api/post'
import useGetPostListByUserId from '@/hooks/api/queries/useGetPostListByUserId'

const useFetchPostListWithLikerFriendStatus = (userId?: string) => {
  const {
    value: { id: selfId }
  } = useUserContext()

  const { friendList: selfFriendList, isPending: isFriendListPending } =
    useGetFriendList(selfId)
  const { postList, isPending: isGetPostPending } = useGetPostList(userId)
  const { postListByUserId, isPending: isGetPostListByUserIdPending } =
    useGetPostListByUserId(userId)

  const originalPostList = userId ? postListByUserId : postList
  const postLoadingState = userId
    ? isGetPostListByUserIdPending
    : isGetPostPending

  if (
    isFriendListPending ||
    postLoadingState ||
    !originalPostList ||
    !selfFriendList
  )
    return { postList: undefined, isPending: true }

  const output = originalPostList.map((post) => {
    const likerList = post.likerList.map((liker) => {
      const friendStatus = getFriendStatus({
        selfId,
        userId: liker.id,
        selfFriendList
      })
      return {
        ...liker,
        friendStatus
      }
    })

    return {
      ...post,
      likerList
    }
  }) as Post[]

  return { postList: output, isPending: false }
}

export default useFetchPostListWithLikerFriendStatus
