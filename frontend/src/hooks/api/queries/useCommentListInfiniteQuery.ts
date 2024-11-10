import PostApi from '@/api/post'
import { FECommentType } from '@/api/post/schema'
import { useInfiniteQuery } from '@tanstack/react-query'

const useCommentListInfiniteQuery = (postId: string) => {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['getPostCommentList', postId],
      queryFn: async ({ pageParam }) => {
        return PostApi.getPostCommentList({ postId, page: pageParam, limit: 3 })
      },
      // 從第二頁 comment 開始拿，因為第一頁在 fetch post 的時候已經會先給了
      initialPageParam: 2,
      getNextPageParam: (lastPage) => {
        const { page, total, pageSize } = lastPage
        const hasNextPage = page * pageSize < total
        return hasNextPage ? lastPage.page + 1 : null
      },
      select: (data) => {
        return data.pages.reduce(
          (acc, cur) => acc.concat(cur.result),
          [] as FECommentType[]
        )
      },
      enabled: false
    })

  return {
    commentList: data,
    isPending,
    isFetchingNextPage,
    fetchNextCommentPage: fetchNextPage,
    hasNextPage
  }
}

export default useCommentListInfiniteQuery
