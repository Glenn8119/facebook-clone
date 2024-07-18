import PostApi from '@/api/post'
import useToastContext from '@/hooks/userToastContext'
import { Post } from '@/types/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeletePostComment = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()

  const { mutateAsync: deletePostComment } = useMutation({
    mutationFn: PostApi.deletePostComment,
    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })

      queryClient.setQueryData(['getPostList'], (oldPostList: Post[]) => {
        return oldPostList.map((post) => {
          if (post.id !== postId) return post
          const newCommentList = post.commentList.filter(
            (comment) => comment.id !== commentId
          )
          return {
            ...post,
            commentList: newCommentList
          }
        })
      })

      const previousPostList = queryClient.getQueryData(['getPostList'])
      return { previousPostList }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['getPostList'], context?.previousPostList)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] })
      // TODO: check if needed after adding profile post
      // invalidateQuery(['getPostList', postId])
    },
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '留言已刪除' })
    }
  })

  return { deletePostComment }
}

export default useDeletePostComment
