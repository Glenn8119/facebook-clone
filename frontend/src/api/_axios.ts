import axios, { RawAxiosRequestHeaders, Method, AxiosResponse } from 'axios'

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

const _axios = async ({
  url,
  headers,
  method = 'get',
  body,
  params
}: {
  url: string
  headers: RawAxiosRequestHeaders
  method?: Method
  body?: unknown
  params?: Record<string, unknown>
}): Promise<AxiosResponse['data']> => {
  const res = await baseAxios(url, {
    headers: { ...baseAxios.defaults.headers.common, ...headers },
    method,
    data: body,
    params
  })

  return res.data
}

export default _axios
