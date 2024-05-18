import { FC, ReactNode, useReducer, Dispatch, createContext } from 'react'
import {
  PostContextType,
  PostReducerActionType
} from '@/types/context/post-context'

export const PostContext = createContext<{
  value: PostContextType
  dispatch: Dispatch<PostReducerActionType>
}>({ value: [], dispatch: () => {} })

const postReducer = (_: PostContextType, action: PostReducerActionType) => {
  switch (action.type) {
    case 'getPostList':
      return action.payload
  }
}

type PostContextProviderType = {
  children: ReactNode
}

const PostContextProvider: FC<PostContextProviderType> = ({ children }) => {
  const [postList, dispatch] = useReducer(postReducer, [])

  return (
    <PostContext.Provider value={{ value: postList, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
