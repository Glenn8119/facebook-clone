import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Popover from '@/components/Popover'
import { PopoverType } from '@/types/component/popover'
import { FC } from 'react'
import UserOverviewCard from '@/components/common/user-overview-popover/UserOverviewCard'
import { FriendStatus } from '@/types/common'

type UserOverviewPopoverProps = {
  children: React.ReactNode
  userId: string
  name: string
  friendStatus: FriendStatus
  commonFriendList?: FERecommendationFriendSingleResponseType['commonFriendList']
  addFriend?: (id: string) => void
}

const UserOverviewPopover: FC<UserOverviewPopoverProps> = ({
  children,
  userId,
  addFriend,
  name,
  friendStatus,
  commonFriendList
}) => {
  return (
    <Popover
      type={PopoverType.HOVER}
      popOverElement={
        <UserOverviewCard
          userId={userId}
          addFriend={addFriend}
          name={name}
          friendStatus={friendStatus}
          commonFriendList={commonFriendList}
        />
      }
      popOverClass='animate-fade-in'
    >
      {children}
    </Popover>
  )
}

export default UserOverviewPopover
