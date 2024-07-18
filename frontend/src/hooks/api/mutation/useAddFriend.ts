import FriendApi from '@/api/friend'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAddFriend = () => {
  const { addToast } = useToastContext()
  const {
    value: { id: selfId }
  } = useUserContext()
  const queryClient = useQueryClient()
  const onSuccess = () => {
    addToast({ type: 'SUCCESS', title: '加入好友成功！' })
    queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
  }

  const { mutate } = useMutation({
    mutationFn: FriendApi.addFriend,
    onSuccess
  })

  return { addFriend: mutate }
}

export default useAddFriend
