import useUserContext from '@/hooks/useUserContext'
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

const usePostListInfiniteQuery = (userId?: string) => {
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
      },
      select: (data) => {
        return data.pages.reduce((acc, cur) => {
          const next = cur.result.map((post) => {
            const likerList = post.likerList.map((liker) => {
              const friendStatus =
                liker.id === selfId
                  ? FriendStatus.IS_SELF
                  : liker.isFriend
                  ? FriendStatus.IS_FRIEND
                  : FriendStatus.IS_NOT_FRIEND
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
      }
    })

  return {
    hasNextPage,
    postList: data,
    isPending,
    isFetchingNextPage,
    fetchNextPage
  }
}

export default usePostListInfiniteQuery
