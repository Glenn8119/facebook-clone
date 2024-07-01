import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Popover from '@/components/Popover'
import { PopoverType } from '@/types/component/popover'
import { FC } from 'react'
import UserOverviewCard from '@/components/common/user-overview-popover/UserOverviewCard'

type UserOverviewPopoverProps = {
  children: React.ReactNode
  userId: string
  name: string
  isFriend: boolean | null
  commonFriendList?: FERecommendationFriendSingleResponseType['commonFriendList']
  addFriend?: () => void
}

const UserOverviewPopover: FC<UserOverviewPopoverProps> = ({
  children,
  userId,
  addFriend,
  name,
  isFriend,
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
          isFriend={isFriend}
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
