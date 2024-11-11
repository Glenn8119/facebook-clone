import PostApi from '@/api/post'
import { FEGetPostResponseType } from '@/api/post/schema'
import useToastContext from '@/hooks/userToastContext'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useLocation, useSearchParams } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { ROUTES } from '@/constants/common'

const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const userId = searchParams.get('id')
  const currentRoute = location.pathname

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: PostApi.deletePost,
    onSuccess: (_, postId) => {
      const invalidateIfCanNotScroll = (queryKey: string[]) => {
        if (document.documentElement.scrollHeight <= window.innerHeight) {
          queryClient.invalidateQueries({ queryKey })
        }
      }

      const updateCacheQueryData = (queryKey: string[]) => {
        const oldPostList =
          queryClient.getQueryData<InfiniteData<FEGetPostResponseType>>(
            queryKey
          )!
        const newPostList = cloneDeep(oldPostList)
        newPostList.pages.map((page) => {
          page.result = page.result.filter((post) => {
            return post.id !== postId
          })
          return page
        })
        queryClient.setQueryData(queryKey, newPostList)
        setTimeout(() => invalidateIfCanNotScroll(queryKey))
      }

      if (userId && currentRoute === ROUTES.PROFILE) {
        updateCacheQueryData(['getPostListByUserId', userId])
      } else {
        updateCacheQueryData(['getPostList'])
      }
      addToast({ type: 'SUCCESS', title: '貼文已刪除' })
    }
  })

  return { deletePost }
}

export default useDeletePost
