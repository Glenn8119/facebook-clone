import PostApi from '@/api/post'
import { Post } from '@/types/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEditPostComment = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: editPostComment } = useMutation({
    mutationFn: PostApi.editPostComment,
    onMutate: async ({ postId, commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })

      queryClient.setQueryData(['getPostList'], (oldPostList: Post[]) => {
        return oldPostList.map((post) => {
          if (post.id !== postId) return post

          const newCommentList = post.commentList.map((comment) => {
            if (comment.id !== commentId) return comment

            return {
              ...comment,
              content
            }
          })

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
    }
  })

  return { editPostComment }
}

export default useEditPostComment
