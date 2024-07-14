import PostApi from '@/api/post'
import { useQuery } from '@tanstack/react-query'

const useGetPostList = (userId?: string) => {
  const { isPending, data } = useQuery({
    queryKey: ['getPostList'],
    queryFn: PostApi.getPostList,
    staleTime: 0,
    enabled: !userId
  })

  return { postList: data, isPending }
}

export default useGetPostList
