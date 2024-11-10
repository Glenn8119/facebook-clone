import PostApi from '@/api/post'
import { FEGetPostCommentResponseType } from '@/api/post/schema'
import useToastContext from '@/hooks/userToastContext'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import cloneDeep from 'lodash/cloneDeep'

const useDeletePostComment = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()

  const { mutateAsync: deletePostComment } = useMutation({
    mutationFn: PostApi.deletePostComment,
    onMutate: async ({ postId, commentId }) => {
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
            const newPageResult = page.result.filter((comment) => {
              return comment.id !== commentId
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
    },
    onSettled: (data, error, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['getPostCommentList', postId]
      })
    },
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '留言已刪除' })
    }
  })

  return { deletePostComment }
}

export default useDeletePostComment
