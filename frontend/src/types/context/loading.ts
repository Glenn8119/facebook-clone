export type LoadingContextType = { isLoading: boolean; text: string }

export type LoadingReducerActionType =
  | {
      type: 'START_LOADING'
      payload?: string
    }
  | {
      type: 'STOP_LOADING'
    }
