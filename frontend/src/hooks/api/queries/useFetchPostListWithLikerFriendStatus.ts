import useUserContext from '@/hooks/useUserContext'
import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import { Post } from '@/types/api/post'
import { useInfiniteQuery } from '@tanstack/react-query'
import PostApi from '@/api/post'
import { FriendStatus } from '@/types/common'

const getPostListByUserId = async (userId: string, page: number) => {
  return PostApi.getPostListByUserId(userId, page)
}

const getPostList = async (page: number) => {
  return PostApi.getPostList(page)
}

const useFetchPostListWithLikerFriendStatus = (userId?: string) => {
  const {
    value: { id: selfId }
  } = useUserContext()

  const getQueryKey = () => {
    if (userId) {
      return ['getPostListByUserId', userId]
    } else {
      return ['getPostList']
    }
  }

  const { friendList: selfFriendList, isPending: isFriendListPending } =
    useGetFriendList(selfId)

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: getQueryKey(),
      queryFn: async ({ pageParam }) => {
        return userId
          ? getPostListByUserId(userId, pageParam)
          : getPostList(pageParam)
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, total, pageSize } = lastPage
        const hasNextPage = page * pageSize < total
        return hasNextPage ? lastPage.page + 1 : null
      }
    })

  if (!data || !selfFriendList || isPending || isFriendListPending) {
    return {
      hasNextPage,
      postList: undefined,
      isPending: true,
      isFetchingNextPage: false,
      fetchNextPage
    }
  }

  // 在後端回傳的文章中沒有說明點讚的人是否是自己的好友，UI 需要根據此來顯示不同，所以前端自己組
  const result = data.pages.reduce((acc, cur) => {
    const next = cur.result.map((post) => {
      const likerList = post.likerList.map((liker) => {
        const friendStatus =
          liker.id === selfId
            ? FriendStatus.IsSelf
            : liker.isFriend
            ? FriendStatus.IsFriend
            : FriendStatus.IsNotFriend
        return {
          ...liker,
          friendStatus
        }
      })
      return {
        ...post,
        likerList
      }
    })

    return acc.concat(next)
  }, [] as Post[])

  return {
    hasNextPage,
    postList: result,
    isPending: false,
    isFetchingNextPage,
    fetchNextPage
  }
}

export default useFetchPostListWithLikerFriendStatus
