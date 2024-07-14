import PostApi from '@/api/post'
import { ROUTES } from '@/constants/common'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useSearchParams } from 'react-router-dom'

const useCreatePost = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const userId = searchParams.get('id')
  const currentRoute = location.pathname
  const queryClient = useQueryClient()

  const { mutateAsync: createPost } = useMutation({
    mutationFn: PostApi.createPost,
    onSuccess: () => {
      if (userId && currentRoute === ROUTES.PROFILE) {
        queryClient.invalidateQueries({
          queryKey: ['getPostListByUserId', userId]
        })
      } else {
        queryClient.invalidateQueries({ queryKey: ['getPostList'] })
      }
    }
  })

  return { createPost }
}

export default useCreatePost
