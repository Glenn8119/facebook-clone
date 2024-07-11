import PostApi from '@/api/post'
import useUserContext from '@/hooks/useUserContext'
import { Post } from '@/types/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUnlikePost = () => {
  const queryClient = useQueryClient()
  const {
    value: { id }
  } = useUserContext()

  const { mutateAsync: unlikePost } = useMutation({
    mutationFn: PostApi.unlikePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })

      queryClient.setQueryData(['getPostList'], (oldPostList: Post[]) => {
        return oldPostList.map((post) => {
          if (post.id !== postId) return post
          const newLikerList = post.likerList.filter((liker) => liker.id !== id)
          return {
            ...post,
            likerList: newLikerList
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

  return { unlikePost }
}

export default useUnlikePost
