import PostApi from '@/api/post'
import useToastContext from '@/hooks/userToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: PostApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] })
      addToast({ type: 'SUCCESS', title: '貼文已刪除' })
    }
  })

  return { deletePost }
}

export default useDeletePost
