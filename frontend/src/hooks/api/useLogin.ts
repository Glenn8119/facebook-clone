import UserApi from '@/api/user'
import { useMutation } from '@tanstack/react-query'
import useUserContext from '@/hooks/useUserContext'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const { dispatch } = useUserContext()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: UserApi.login,
    onSuccess: async (data, formData) => {
      const loginResponse = data
      const userInfo = {
        account: formData.account,
        token: loginResponse.accessToken,
        name: '',
        id: ''
      }

      localStorage.setItem('user', JSON.stringify(userInfo))
      const userDetail = await UserApi.getUserDetail()
      userInfo.name = userDetail.name
      userInfo.id = userDetail.id

      dispatch({
        type: 'login',
        payload: userInfo
      })
      localStorage.setItem('user', JSON.stringify(userInfo))
      navigate('/')
    }
  })
}

export default useLogin
