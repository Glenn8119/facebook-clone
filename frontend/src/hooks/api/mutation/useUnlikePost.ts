import PostApi from '@/api/post'
import { FEGetPostResponseType } from '@/api/post/schema'
import { ROUTES } from '@/constants/common'
import useUserContext from '@/hooks/useUserContext'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import cloneDeep from 'lodash/cloneDeep'
import { useLocation, useSearchParams } from 'react-router-dom'

const useUnlikePost = () => {
  const queryClient = useQueryClient()
  const {
    value: { id: currentUserId }
  } = useUserContext()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const userId = searchParams.get('id')
  const currentRoute = location.pathname

  const { mutateAsync: unlikePost } = useMutation({
    mutationFn: PostApi.unlikePost,
    onMutate: async (postId) => {
      const updateCacheQueryData = (queryKey: string[]) => {
        const oldPostList =
          queryClient.getQueryData<InfiniteData<FEGetPostResponseType>>(
            queryKey
          )!
        const newPostList = cloneDeep(oldPostList)
        newPostList.pages.map((page) => {
          page.result = page.result.map((post) => {
            if (post.id === postId) {
              post.likerList = post.likerList.filter(
                (liker) => liker.id != currentUserId
              )
            }
            return post
          })
          return page
        })
        queryClient.setQueryData(queryKey, newPostList)
      }

      if (userId && currentRoute === ROUTES.PROFILE) {
        updateCacheQueryData(['getPostListByUserId', userId])
      } else {
        updateCacheQueryData(['getPostList'])
      }
    }
  })

  return { unlikePost }
}

export default useUnlikePost
