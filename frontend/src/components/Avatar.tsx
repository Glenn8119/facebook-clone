import { FC, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FakeAvatar from '@/assets/fake-avatar.jpeg'

type AvatarProps = InputHTMLAttributes<HTMLImageElement> & {
  imgUrl?: string
}

const Avatar: FC<AvatarProps> = ({
  imgUrl = FakeAvatar,
  className,
  ...props
}) => {
  const cn = twMerge('rounded-full h-10 w-10', className)

  return <img src={imgUrl} className={cn} {...props} />
}

export default Avatar
