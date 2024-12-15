export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>
export type Nullable<T> = T | null
export type AnyFunction = (...args: any[]) => any
export type PlainObject = Record<string, unknown>

export type AvatarInfo = {
  friendStatus: FriendStatus
  id: string
  name: string
  commonFriendList?: {
    name: string
    id: string
    avatarImage: Nullable<string>
  }[]
  avatarImage: Nullable<string>
}

export enum FriendStatus {
  IS_FRIEND = 'Is-friend',
  IS_NOT_FRIEND = 'Is-not-friend',
  IS_SELF = 'Is-self'
}
