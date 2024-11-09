import { FEGetSinglePostResponseType, FELikerType } from '@/api/post/schema'
import { FriendStatus } from '@/types/common'

export type Post = Omit<FEGetSinglePostResponseType, 'likerList'> & {
  likerList: (FELikerType & { friendStatus: FriendStatus })[]
}
