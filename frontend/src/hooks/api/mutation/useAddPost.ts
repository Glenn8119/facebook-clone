import PostApi from '@/api/post'
import { ROUTES } from '@/constants/common'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useLocation, useSearchParams } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { FEGetPostResponseType } from '@/api/post/schema'

const useCreatePost = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const userId = searchParams.get('id')
  const currentRoute = location.pathname
  const queryClient = useQueryClient()

  const { mutateAsync: createPost } = useMutation({
    mutationFn: PostApi.createPost,
    onSuccess: (data) => {
      const updateCacheQueryData = (queryKey: string[]) => {
        const oldPostList =
          queryClient.getQueryData<InfiniteData<FEGetPostResponseType>>(
            queryKey
          )!
        const newPostList = cloneDeep(oldPostList)

        const mockPage = {
          page: 0,
          pageSize: 1,
          result: [
            {
              ...data,
              likerList: [],
              poster: oldPostList.pages[0].result[0].poster
            }
          ],
          total: oldPostList.pages[0].total + 1
        }
        newPostList.pages.unshift(mockPage)
        queryClient.setQueryData(queryKey, newPostList)
      }

      if (userId && currentRoute === ROUTES.PROFILE) {
        updateCacheQueryData(['getPostListByUserId', userId])
      } else {
        updateCacheQueryData(['getPostList'])
      }
    }
  })

  return { createPost }
}

export default useCreatePost
