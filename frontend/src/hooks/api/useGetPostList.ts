import PostApi from '@/api/post'
import { useQuery } from '@tanstack/react-query'

const useGetPostList = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ['getPostList'],
    queryFn: PostApi.getPostList,
    staleTime: 0
  })

  console.log({ error })

  return { postList: data, isPending }
}

export default useGetPostList
