import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import FakeAvatar from '@/assets/fake-avatar.jpeg'
import { AnyFunction } from '@/types/common'

type AvatarProps = {
  imgUrl?: string
  className?: string
  style?: Record<string, string>
  onClick?: AnyFunction
}

const Avatar: FC<AvatarProps> = ({
  imgUrl = FakeAvatar,
  className,
  style,
  onClick
}) => {
  const cn = twMerge('rounded-full', className)

  return (
    <img
      style={style}
      width='40'
      height='40'
      src={imgUrl}
      className={cn}
      onClick={onClick}
    />
  )
}

export default Avatar
