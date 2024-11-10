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
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, total, pageSize } = lastPage
        const hasNextPage = page * pageSize < total
        return hasNextPage ? lastPage.page + 1 : null
      },
      enabled: !!postId
    })

  const commentList =
    data?.pages.reduce(
      (acc, cur) => acc.concat(cur.result),
      [] as FECommentType[]
    ) ?? []

  return {
    totalCount: data?.pages[0].total,
    commentList,
    isPending,
    isFetchingNextPage,
    fetchNextCommentPage: fetchNextPage,
    hasNextPage
  }
}

export default useCommentListInfiniteQuery
