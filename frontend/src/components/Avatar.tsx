import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type AvatarProps = {
  imgUrl?: string
  className?: string
}

const Avatar: FC<AvatarProps> = ({ imgUrl, className }) => {
  const cn = twMerge('rounded-full', className)

  return <img width='40' height='40' src={imgUrl} className={cn} />
}

export default Avatar
