import PostApi from '@/api/post'
import useUserContext from '@/hooks/useUserContext'
import { Post } from '@/types/api/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLikePost = () => {
  const queryClient = useQueryClient()
  const {
    value: { id, name }
  } = useUserContext()

  const { mutateAsync: likePost } = useMutation({
    mutationFn: PostApi.likePost,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ['getPostList'] })

      queryClient.setQueryData(['getPostList'], (oldPostList: Post[]) => {
        return oldPostList.map((post) => {
          if (post.id !== postId) return post
          const newLikerList = [
            ...post.likerList,
            {
              id,
              name,
              commonFriendList: [], // mock for optimistic update
              friendStatus: null // mock for optimistic update
            }
          ]
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

  return { likePost }
}

export default useLikePost
