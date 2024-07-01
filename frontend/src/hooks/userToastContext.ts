import { ToastContext } from '@/context/ToastContextProvider'
import { useContext } from 'react'

const useToastContext = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('ToastContext must be inside ToastContextProvider.')
  }

  return context
}

export default useToastContext
