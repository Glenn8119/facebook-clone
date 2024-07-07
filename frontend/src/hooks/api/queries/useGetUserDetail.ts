import UserApi from '@/api/user'
import { useQuery } from '@tanstack/react-query'

const useGetUserDetail = (id: string) => {
  const { isPending, data } = useQuery({
    queryKey: ['getUserDetail', id],
    queryFn: () => UserApi.getUserDetail(id)
  })

  return { userDetail: data, isPending }
}

export default useGetUserDetail
