export type ToastType = 'SUCCESS'

export type ToastConfig = {
  type: ToastType
  title: string
  id: number
  content?: string
  timeout?: number
}

export type ToastContextType = ToastConfig[]

export type ToastReducerActionType =
  | {
      type: 'ADD_TOAST'
      payload: ToastConfig
    }
  | {
      type: 'FILTER_TOAST'
      payload: {
        id: number
      }
    }
