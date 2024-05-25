import { FC, ReactNode, useReducer, Dispatch, createContext } from 'react'
import {
  LoadingContextType,
  LoadingReducerActionType
} from '@/types/context/loading'

export const LoadingContext = createContext<{
  value: LoadingContextType
  dispatch: Dispatch<LoadingReducerActionType>
}>({ value: { isLoading: false, text: '' }, dispatch: () => {} })

const loadingReducer = (
  _: LoadingContextType,
  action: LoadingReducerActionType
) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true,
        text: action.payload ?? ''
      }
    case 'STOP_LOADING':
      return {
        isLoading: false,
        text: ''
      }
  }
}

type LoadingContextProviderType = {
  children: ReactNode
}

const LoadingContextProvider: FC<LoadingContextProviderType> = ({
  children
}) => {
  const [loadingState, dispatch] = useReducer(loadingReducer, {
    isLoading: false,
    text: ''
  })

  return (
    <LoadingContext.Provider value={{ value: loadingState, dispatch }}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingContextProvider
