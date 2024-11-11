import PostApi from '@/api/post'
import { FEGetPostResponseType } from '@/api/post/schema'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useLocation, useSearchParams } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { ROUTES } from '@/constants/common'

const useEditPost = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const userId = searchParams.get('id')
  const currentRoute = location.pathname

  const { mutateAsync: editPost } = useMutation({
    mutationFn: PostApi.editPost,
    onSuccess: (data) => {
      const updateCacheQueryData = (queryKey: string[]) => {
        const oldPostList =
          queryClient.getQueryData<InfiniteData<FEGetPostResponseType>>(
            queryKey
          )!
        const newPostList = cloneDeep(oldPostList)
        newPostList.pages.map((page) => {
          page.result = page.result.map((post) => {
            return post.id === data.id
              ? { ...data, likerList: post.likerList, poster: post.poster }
              : post
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

  return { editPost }
}

export default useEditPost
