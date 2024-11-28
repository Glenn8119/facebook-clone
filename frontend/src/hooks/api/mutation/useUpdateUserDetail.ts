import UserApi from '@/api/user'
import useUserContext from '@/hooks/useUserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateUserDetail = () => {
  const {
    value: { id: selfId }
  } = useUserContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: UserApi.updateUserDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserDetail', selfId] })
    }
  })
}

export default useUpdateUserDetail
