import { FC, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import DefaultImage from '@/assets/default_image.png'
import { Nullable } from '@/types/common'

type AvatarProps = InputHTMLAttributes<HTMLImageElement> & {
  imgUrl?: Nullable<string>
}

const Avatar: FC<AvatarProps> = ({ imgUrl, className, ...props }) => {
  const cn = twMerge('rounded-full h-10 w-10', className)

  return <img src={imgUrl ?? DefaultImage} className={cn} {...props} />
}

export default Avatar
