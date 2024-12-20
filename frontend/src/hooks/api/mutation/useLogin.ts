import AuthApi from '@/api/auth'
import { useMutation } from '@tanstack/react-query'
import useUserContext from '@/hooks/useUserContext'
import { ROUTES } from '@/constants/common'
import useNavigateTo from '@/hooks/useNavigateTo'

const useLogin = () => {
  const { dispatch } = useUserContext()
  const navigate = useNavigateTo()

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: async (data, formData) => {
      const loginResponse = data
      const userInfo = {
        account: formData.account,
        accessToken: loginResponse.accessToken,
        refreshToken: loginResponse.refreshToken,
        avatarImage: '',
        name: '',
        id: ''
      }

      localStorage.setItem('user', JSON.stringify(userInfo))
      const userDetail = await AuthApi.getAuthInfo()
      userInfo.avatarImage = userDetail.avatarImage ?? ''
      userInfo.name = userDetail.name
      userInfo.id = userDetail.id

      dispatch({
        type: 'login',
        payload: userInfo
      })
      localStorage.setItem('user', JSON.stringify(userInfo))
      navigate({ pathname: ROUTES.HOME_PAGE })
    }
  })
}

export default useLogin
