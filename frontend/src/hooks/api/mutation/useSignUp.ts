import AuthApi from '@/api/auth'
import useLogin from '@/hooks/api/mutation/useLogin'
import { useMutation } from '@tanstack/react-query'

const useSignUp = () => {
  const { mutateAsync: login, isPending: isLoginPending } = useLogin()

  const mutate = useMutation({
    mutationFn: AuthApi.signUp,
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
