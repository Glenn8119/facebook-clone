import FriendApi from '@/api/friend'
import { AnyFunction } from '@/types/common'
import { useMutation } from '@tanstack/react-query'

const useAddFriend = ({ onSuccess }: { onSuccess: AnyFunction }) => {
  const { mutate } = useMutation({
    mutationFn: FriendApi.addFriend,
    onSuccess
  })

  return { addFriend: mutate }
}

export default useAddFriend
