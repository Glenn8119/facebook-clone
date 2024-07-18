import FriendApi from '@/api/friend'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteFriend = () => {
  const { addToast } = useToastContext()
  const {
    value: { id: selfId }
  } = useUserContext()
  const queryClient = useQueryClient()
  const onSuccess = () => {
    addToast({ type: 'SUCCESS', title: '已移除好友' })
    queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
  }

  const { mutateAsync } = useMutation({
    mutationFn: FriendApi.deleteFriend,
    onSuccess
  })

  return { deleteFriend: mutateAsync }
}

export default useDeleteFriend
