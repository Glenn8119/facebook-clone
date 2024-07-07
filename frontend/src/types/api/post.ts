import { FEGetSinglePostResponseType } from '@/api/post/schema'
import { FriendStatus } from '@/types/common'

export type Post = Omit<FEGetSinglePostResponseType, 'likerList'> & {
  likerList: {
    id: string
    name: string
    commonFriendList: { id: string; name: string }[]
    friendStatus: FriendStatus
  }[]
}
