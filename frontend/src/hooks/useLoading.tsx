import { LoadingContext } from '@/context/LoadingContextProvider'
import { useContext } from 'react'

const useLoadingContext = () => {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('LoadingContext must be inside LoadingContextProvider.')
  }

  return context
}

export default useLoadingContext
