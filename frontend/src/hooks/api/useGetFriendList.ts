import FriendApi from '@/api/friend'
import { useQuery } from '@tanstack/react-query'

const useGetFriendList = () => {
  const { isPending, data } = useQuery({
    queryKey: ['getFriendList'],
    queryFn: FriendApi.getFriendList
  })

  return { friendList: data, isPending }
}

export default useGetFriendList
