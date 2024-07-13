import PostApi from '@/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeletePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: PostApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] })
    }
  })

  return { deletePost }
}

export default useDeletePost
