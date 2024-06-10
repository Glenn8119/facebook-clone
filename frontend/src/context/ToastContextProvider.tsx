import { FC, ReactNode, useReducer, createContext, useState } from 'react'
import {
  ToastConfig,
  ToastContextType,
  ToastReducerActionType
} from '@/types/context/toast'

export const ToastContext = createContext<{
  value: ToastContextType
  addToast: (config: Omit<ToastConfig, 'id'>) => void
}>({ value: [], addToast: () => {} })

const toastReducer = (
  state: ToastContextType,
  action: ToastReducerActionType
) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]
    case 'FILTER_TOAST':
      return state.filter((toast) => toast.id !== action.payload.id)
  }
}

type ToastContextProviderType = {
  children: ReactNode
}

const ToastContextProvider: FC<ToastContextProviderType> = ({ children }) => {
  const [toastState, dispatch] = useReducer(toastReducer, [])
  const [toastId, setToastId] = useState(0)

  const addToast = (config: Omit<ToastConfig, 'id'>) => {
    setToastId(toastId + 1)
    const timeout = config.timeout || 2000
    dispatch({ type: 'ADD_TOAST', payload: { ...config, id: toastId } })

    setTimeout(() => {
      dispatch({ type: 'FILTER_TOAST', payload: { id: toastId } })
    }, timeout)
  }

  return (
    <ToastContext.Provider value={{ value: toastState, addToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider
