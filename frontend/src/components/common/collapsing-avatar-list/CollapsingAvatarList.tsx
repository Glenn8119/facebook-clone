import Avatar from '@/components/Avatar'
import { AvatarInfo } from '@/types/common'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type CollapsingAvatarListProps = {
  avatarInfoList: AvatarInfo[]
  className?: string
  avatarClassName?: string
  length?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

const CollapsingAvatarList: FC<CollapsingAvatarListProps> = ({
  avatarInfoList,
  className,
  avatarClassName,
  length = 7
}) => {
  const cn = twMerge('flex', className)
  const finalList = avatarInfoList.slice(0, length)
  const listLength = finalList.length

  return (
    <div className={cn}>
      {finalList.map((avatarInfo, idx) => {
        const marginClass = idx !== 0 ? '-ml-2' : ''
        const initialZIndex = listLength - idx
        const zIndexStyle = { zIndex: `${initialZIndex}` }

        const cn = twMerge(
          'border-white border-2 rounded-full',
          marginClass,
          avatarClassName
        )

        // TODO: user other info as key
        return (
          <Avatar
            style={zIndexStyle}
            key={idx}
            imgUrl={avatarInfo.imgUrl}
            className={cn}
          />
        )
      })}
    </div>
  )
}

export default CollapsingAvatarList
