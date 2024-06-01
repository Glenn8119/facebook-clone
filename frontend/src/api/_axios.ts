import axios, { RawAxiosRequestHeaders, Method } from 'axios'
import { ZodSchema, z } from 'zod'

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
  responseSchema: T
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
    const user = JSON.parse(localStorage.getItem('user') ?? 'null')
    requesHeaders['Authorization'] = `Bearer ${user?.token}`
  }

  // TODO: error handle
  const res = await baseAxios(url, {
    headers: requesHeaders,
    method,
    data: body,
    params
  })

  const data = res.data
  // TODO: zod error handle
  const parsedData = responseSchema.parse(data)
  return parsedData
}

export default _axios
