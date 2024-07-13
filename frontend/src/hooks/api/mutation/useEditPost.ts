import PostApi from '@/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEditPost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: editPost } = useMutation({
    mutationFn: PostApi.editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] })
    }
  })

  return { editPost }
}

export default useEditPost
