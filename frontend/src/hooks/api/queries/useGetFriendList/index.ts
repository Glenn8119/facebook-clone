import FriendApi from '@/api/friend'
import { useQuery } from '@tanstack/react-query'

const useGetFriendList = (id: string, enabled: boolean = true) => {
  const { isPending, data } = useQuery({
    queryKey: ['getFriendList', id],
    queryFn: () => FriendApi.getFriendList(id),
    staleTime: 5 * 1000,
    enabled
  })

  return { friendList: data, isPending }
}

export default useGetFriendList
