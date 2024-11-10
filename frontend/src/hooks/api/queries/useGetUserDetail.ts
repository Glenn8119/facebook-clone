import UserApi from '@/api/user'
import { useQuery } from '@tanstack/react-query'

const useGetUserDetail = (id: string, isEnabled?: boolean) => {
  const { isPending, data } = useQuery({
    queryKey: ['getUserDetail', id],
    queryFn: () => UserApi.getUserDetail(id),
    enabled: isEnabled
  })

  return { userDetail: data, isPending }
}

export default useGetUserDetail
