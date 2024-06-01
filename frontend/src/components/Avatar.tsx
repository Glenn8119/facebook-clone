import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import FakeAvatar from '@/assets/fake-avatar.jpeg'

type AvatarProps = {
  imgUrl?: string
  className?: string
  style?: Record<string, string>
}

const Avatar: FC<AvatarProps> = ({ imgUrl = FakeAvatar, className, style }) => {
  const cn = twMerge('rounded-full', className)

  return (
    <img style={style} width='40' height='40' src={imgUrl} className={cn} />
  )
}

export default Avatar
