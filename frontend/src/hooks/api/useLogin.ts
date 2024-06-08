import UserApi from '@/api/user'
import { useMutation } from '@tanstack/react-query'
import useUserContext from '@/hooks/useUserContext'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const { dispatch } = useUserContext()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: UserApi.login,
    onSuccess: (data, formData) => {
      const response = data
      dispatch({
        type: 'login',
        payload: { account: formData.account, token: response.accessToken }
      })
      localStorage.setItem(
        'user',
        JSON.stringify({
          account: formData.account,
          token: response.accessToken
        })
      )
      navigate('/')
    }
  })
}

export default useLogin
