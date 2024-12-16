import Avatar from '@/components/Avatar'
import { AnyFunction, AvatarInfo } from '@/types/common'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover.tsx'

type CollapsingAvatarListProps = {
  avatarInfoList: AvatarInfo[]
  handleClickList?: AnyFunction
  className?: string
  avatarClassName?: string
  length?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

const CollapsingAvatarList: FC<CollapsingAvatarListProps> = ({
  avatarInfoList,
  className,
  avatarClassName,
  length = 7,
  handleClickList
}) => {
  const cn = twMerge('flex', className)
  const finalList = avatarInfoList.slice(0, length)
  const listLength = finalList.length

  const handleClick = () => {
    handleClickList && handleClickList()
  }

  return (
    <div className={cn} onClick={() => handleClick()}>
      {finalList.map((avatarInfo, idx) => {
        const marginClass = idx !== 0 ? '-ml-2' : ''
        const initialZIndex = listLength - idx
        const zIndexStyle = { zIndex: `${initialZIndex}` }

        const cn = twMerge(
          'border-white border-2 rounded-full cursor-pointer',
          marginClass,
          avatarClassName
        )

        return (
          <LazyLoadUserOverviewPopover
            key={avatarInfo.id}
            userId={avatarInfo.id}
          >
            <Avatar
              style={zIndexStyle}
              imgUrl={avatarInfo.avatarImage}
              className={cn}
            />
          </LazyLoadUserOverviewPopover>
        )
      })}
    </div>
  )
}

export default CollapsingAvatarList
