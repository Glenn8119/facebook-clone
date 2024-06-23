import FriendApi from '@/api/friend'
import { useQuery } from '@tanstack/react-query'

const useGetFriendList = (id: string) => {
  const { isPending, data } = useQuery({
    queryKey: ['getFriendList'],
    queryFn: () => FriendApi.getFriendList(id)
  })

  return { friendList: data, isPending }
}

export default useGetFriendList
