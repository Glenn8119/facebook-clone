import PostApi from '@/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCreatePostComment = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createPostComment } = useMutation({
    mutationFn: PostApi.createPostComment,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })
      const previousPostList = queryClient.getQueryData(['getPostList'])
      return { previousPostList }
    },
    onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] })
      // TODO: check if needed after adding profile post
      // invalidateQuery(['getPostList', postId])
    }
  })

  return { createPostComment }
}

export default useCreatePostComment
