import { Post } from '@/types/pages/home-page'

export type PostContextType = Post[]

export type PostReducerActionType = { type: 'getPostList'; payload: Post[] }
