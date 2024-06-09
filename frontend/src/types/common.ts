export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>
export type Nullable<T> = T | null
export type AnyFunction = (...args: any[]) => any
export type PlainObject = Record<string, unknown>

export type AvatarInfo = {
  imgUrl?: string
  id: string
}
