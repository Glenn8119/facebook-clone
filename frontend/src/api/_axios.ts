import axios, { RawAxiosRequestHeaders, Method } from 'axios'
import { ZodSchema, z } from 'zod'
import AuthApi from '@/api/auth'
import dayjs from 'dayjs'
import decodeJWT from '@/utils/decodeJWT'

const checkAndMaybeRefreshToken = async () => {
  const userInfo = JSON.parse(localStorage.getItem('user') ?? 'null')
  if (!userInfo?.accessToken) {
    return null
  }

  const checkIfNeedRefresh = () => {
    const decodedToken = decodeJWT(userInfo.accessToken) as {
      sub: string
      id: string
      exp: number
    }
    const expiredTimestamp = decodedToken.exp * 1000
    const currentTimestamp = new Date().getTime()
    return dayjs(expiredTimestamp).diff(currentTimestamp, 'seconds') < 600
  }

  if (checkIfNeedRefresh()) {
    const refreshToken = userInfo.refreshToken
    const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
      await AuthApi.refreshToken({
        refresh_token: refreshToken
      })
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...userInfo,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      })
    )
    return newAccessToken
  }

  return userInfo.accessToken
}

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

const _axios = async <T extends ZodSchema>({
  url,
  headers,
  responseSchema,
  isNeedToken = true,
  method = 'GET',
  body,
  params
}: {
  url: string
  responseSchema?: T
  isNeedToken?: boolean
  headers?: RawAxiosRequestHeaders
  method?: Method
  body?: unknown
  params?: Record<string, unknown>
}): Promise<z.infer<T>> => {
  const requesHeaders = {
    ...baseAxios.defaults.headers.common,
    ...headers
  } as RawAxiosRequestHeaders

  if (isNeedToken) {
    const accessToken = await checkAndMaybeRefreshToken()
    requesHeaders['Authorization'] = `Bearer ${accessToken}`
  }

  // TODO: error handle
  const res = await baseAxios(url, {
    headers: requesHeaders,
    method,
    data: body,
    params
  })

  const data = res.data
  if (!responseSchema) return data

  // TODO: zod error handle
  const parsedData = responseSchema.parse(data)
  return parsedData
}

export default _axios
