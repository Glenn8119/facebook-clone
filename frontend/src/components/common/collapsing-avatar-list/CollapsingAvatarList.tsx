import Avatar from '@/components/Avatar'
import { AnyFunction, AvatarInfo } from '@/types/common'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FriendApi from '@/api/friend'
import useToastContext from '@/hooks/userToastContext'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'

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
  const { addToast } = useToastContext()
  const queryClient = useQueryClient()
  const { mutate: addFriend } = useMutation({
    mutationFn: FriendApi.addFriend,
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })

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

        // TODO: user other info as key
        return (
          <UserOverviewPopover
            key={avatarInfo.id}
            userId={avatarInfo.id}
            addFriend={() => addFriend(avatarInfo.id)}
            name={avatarInfo.name}
            isFriend={avatarInfo.isFriend}
            commonFriendList={avatarInfo.commonFriendList}
          >
            <Avatar
              style={zIndexStyle}
              imgUrl={avatarInfo.imgUrl}
              className={cn}
            />
          </UserOverviewPopover>
        )
      })}
    </div>
  )
}

export default CollapsingAvatarList
