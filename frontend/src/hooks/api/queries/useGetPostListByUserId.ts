import PostApi from '@/api/post'
import { useQuery } from '@tanstack/react-query'

const useGetPostListByUserId = (userId?: string) => {
  const queryFn = userId
    ? () => PostApi.getPostListByUserId(userId)
    : () => null

  const { isPending, data } = useQuery({
    queryKey: ['getPostListByUserId', userId],
    queryFn,
    staleTime: 0
  })

  return { postListByUserId: data, isPending }
}

export default useGetPostListByUserId
