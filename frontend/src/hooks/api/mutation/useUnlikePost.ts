import PostApi from '@/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUnlikePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: unlikePost } = useMutation({
    mutationFn: PostApi.unlikePost,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })
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

  return { unlikePost }
}

export default useUnlikePost
