import PostApi from '@/api/post'
import useUserContext from '@/hooks/useUserContext'
import { Post } from '@/types/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCreatePostComment = () => {
  const queryClient = useQueryClient()
  const {
    value: { name }
  } = useUserContext()

  const { mutateAsync: createPostComment } = useMutation({
    mutationFn: PostApi.createPostComment,
    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })

      queryClient.setQueryData(['getPostList'], (oldPostList: Post[]) => {
        return oldPostList.map((post) => {
          if (post.id !== postId) return post
          const now = new Date()
          const newCommentList = [
            ...post.commentList,
            {
              id: post.commentList.length,
              content,
              poster: name,
              createdAt: now,
              updatedAt: now
            }
          ]
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
      // queryClient.invalidateQueries({ queryKey: ['getPostList'] })
      // TODO: check if needed after adding profile post
      // invalidateQuery(['getPostList', postId])
    }
  })

  return { createPostComment }
}

export default useCreatePostComment
