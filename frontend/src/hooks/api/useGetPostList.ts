import PostApi from '@/api/post'
import { useQuery } from '@tanstack/react-query'

const useGetPostList = () => {
  const { isPending, data } = useQuery({
    queryKey: ['getPostList'],
    queryFn: PostApi.getPostList
  })

  return { postList: data, isPending }
}

export default useGetPostList
