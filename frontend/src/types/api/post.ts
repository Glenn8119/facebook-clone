import { FEGetSinglePostResponseType } from '@/api/post/schema'

export type Post = Omit<FEGetSinglePostResponseType, 'likerList'> & {
  likerList: {
    id: string
    name: string
    commonFriendList: { id: string; name: string }[]
    isFriend: boolean
  }[]
}
