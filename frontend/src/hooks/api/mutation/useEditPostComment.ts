import PostApi from '@/api/post'
import { FEGetPostCommentResponseType } from '@/api/post/schema'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import cloneDeep from 'lodash/cloneDeep'

const useEditPostComment = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: editPostComment } = useMutation({
    mutationFn: PostApi.editPostComment,
    onMutate: async ({ postId, commentId, content }) => {
      await queryClient.cancelQueries({
        queryKey: ['getPostCommentList', postId]
      })
      const previousPostCommentList = queryClient.getQueryData([
        'getPostCommentList',
        postId
      ])

      queryClient.setQueryData<InfiniteData<FEGetPostCommentResponseType>>(
        ['getPostCommentList', postId],
        (oldPostCommentList) => {
          const newCommentList = cloneDeep(oldPostCommentList)!
          newCommentList.pages = newCommentList.pages.map((page) => {
            const newPageResult = page.result.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  content
                }
              }
              return comment
            })

            page.result = newPageResult
            return page
          })
          return newCommentList
        }
      )

      return { previousPostCommentList }
    },
    onError: (error, { postId }, context) => {
      queryClient.setQueryData(
        ['getPostCommentList', postId],
        context?.previousPostCommentList
      )
    }
  })

  return { editPostComment }
}

export default useEditPostComment
