import PostApi from '@/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCreatePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createPost } = useMutation({
    mutationFn: PostApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] })
    }
  })

  return { createPost }
}

export default useCreatePost
