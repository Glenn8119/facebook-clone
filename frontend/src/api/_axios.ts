import axios, { RawAxiosRequestHeaders, Method } from 'axios'

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

const _axios = ({
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
}) => {
  return baseAxios(url, {
    headers: { ...baseAxios.defaults.headers.common, ...headers },
    method,
    data: body,
    params
  })
}

export default _axios
