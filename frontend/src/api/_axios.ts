import axios, { RawAxiosRequestHeaders, Method } from 'axios'
import { ZodSchema, z } from 'zod'

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

const _axios = async <T extends ZodSchema>({
  url,
  headers,
  responseSchema,
  method = 'get',
  body,
  params
}: {
  url: string
  headers: RawAxiosRequestHeaders
  responseSchema: T
  method?: Method
  body?: unknown
  params?: Record<string, unknown>
}): Promise<z.infer<T>> => {
  // TODO: error handle
  const res = await baseAxios(url, {
    headers: { ...baseAxios.defaults.headers.common, ...headers },
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
