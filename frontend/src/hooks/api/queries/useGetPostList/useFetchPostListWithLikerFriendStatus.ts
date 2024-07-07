import useGetPostList from '@/hooks/api/queries/useGetPostList'
import useUserContext from '@/hooks/useUserContext'
import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import getFriendStatus from '@/utils/freindsStatus'
import { Post } from '@/types/api/post'

const useFetchPostListWithLikerFriendStatus = () => {
  const {
    value: { id: selfId }
  } = useUserContext()

  const { friendList: selfFriendList } = useGetFriendList(selfId)
  const { postList: originalPostList } = useGetPostList()

  if (!originalPostList || !selfFriendList) return { postList: undefined }

  const postList = originalPostList.map((post) => {
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

  return { postList }
}

export default useFetchPostListWithLikerFriendStatus
