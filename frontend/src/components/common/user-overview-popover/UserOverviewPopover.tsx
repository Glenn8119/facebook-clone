import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Popover from '@/components/Popover'
import { PopoverType } from '@/types/component/popover'
import React, { FC } from 'react'
import UserOverviewCard from '@/components/common/user-overview-popover/UserOverviewCard'
import { FriendStatus, Nullable } from '@/types/common'
import useNavigateTo from '@/hooks/useNavigateTo'
import { ROUTES } from '@/constants/common'

type UserOverviewPopoverProps = {
  children: React.ReactNode
  company: Nullable<string>
  userId: string
  name: string
  avatarImage: Nullable<string>
  friendStatus: FriendStatus
  commonFriendList?: FERecommendationFriendSingleResponseType['commonFriendList']
}

const UserOverviewPopover: FC<UserOverviewPopoverProps> = ({
  children,
  userId,
  name,
  company,
  avatarImage,
  friendStatus,
  commonFriendList
}) => {
  const navigate = useNavigateTo()
  const navigateToUserProfile = () => {
    navigate({
      pathname: ROUTES.PROFILE,
      queries: { id: userId }
    })
  }

  return (
    <Popover
      type={PopoverType.HOVER}
      popOverElement={
        <UserOverviewCard
          avatarImage={avatarImage}
          userId={userId}
          company={company}
          name={name}
          friendStatus={friendStatus}
          commonFriendList={commonFriendList}
        />
      }
      popOverClass='animate-fade-in'
    >
      <div onClick={navigateToUserProfile}>{children}</div>
    </Popover>
  )
}

export default UserOverviewPopover
