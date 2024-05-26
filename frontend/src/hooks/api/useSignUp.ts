import UserApi from '@/api/user'
import useLogin from '@/hooks/api/useLogin'
import { useMutation } from '@tanstack/react-query'

const useSignUp = () => {
  const { mutateAsync: login, isPending: isLoginPending } = useLogin()

  const mutate = useMutation({
    mutationFn: UserApi.signUp,
    onSuccess: async (_, { account, password }) => {
      await login({
        account,
        password
      })
    }
  })

  return { isLoginPending, ...mutate }
}

export default useSignUp
