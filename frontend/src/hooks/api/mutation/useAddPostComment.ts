import PostApi from '@/api/post'
import { FEGetPostCommentResponseType } from '@/api/post/schema'
import useUserContext from '@/hooks/useUserContext'
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import cloneDeep from 'lodash/cloneDeep'

const useCreatePostComment = () => {
  const queryClient = useQueryClient()
  const {
    value: { name, id: selfId }
  } = useUserContext()

  const { mutateAsync: createPostComment } = useMutation({
    mutationFn: PostApi.createPostComment,
    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({
        queryKey: ['getPostCommentList', postId]
      })

      const previousPostCommentList = queryClient.getQueryData([
        'getPostCommentList',
        postId
      ])

      queryClient.setQueryData<InfiniteData<FEGetPostCommentResponseType>>(
        ['getPostCommentList', postId],
        (oldPostCommentList) => {
          const newCommentList = cloneDeep(oldPostCommentList)!
          const now = new Date().toString()
          // for UI purpose
          const newMockPage = {
            content,
            id: `${Math.random()}`,
            posterId: selfId,
            poster: name,
            createdAt: now,
            updatedAt: now
          }
          newCommentList.pages[newCommentList.pages.length - 1].result.push(
            newMockPage
          )

          return newCommentList
        }
      )

      return { previousPostCommentList }
    },
    onError: (error, { postId }, context) => {
      queryClient.setQueryData(
        ['getPostCommentList', postId],
        context?.previousPostCommentList
      )
    },
    onSettled: (data, error, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['getPostCommentList', postId]
      })
    }
  })

  return { createPostComment }
}

export default useCreatePostComment
