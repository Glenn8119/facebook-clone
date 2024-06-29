import { createSearchParams, useNavigate } from 'react-router-dom'

const useNavigateTo = () => {
  const navigate = useNavigate()

  const redirectTo = ({
    pathname,
    queries
  }: {
    pathname: string
    queries?: Record<string, string>
  }) => {
    navigate({
      pathname,
      search: createSearchParams(queries).toString()
    })
  }

  return redirectTo
}

export default useNavigateTo
