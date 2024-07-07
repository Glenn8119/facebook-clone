export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>
export type Nullable<T> = T | null
export type AnyFunction = (...args: any[]) => any
export type PlainObject = Record<string, unknown>

export type AvatarInfo = {
  friendStatus: FriendStatus
  id: string
  name: string
  commonFriendList?: { name: string; id: string }[]
  imgUrl?: string
}

export enum FriendStatus {
  IsFriend = 'Is-friend',
  IsNotFriend = 'Is-not-friend',
  IsSelf = 'Is-self'
}
