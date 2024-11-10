import { FC } from 'react'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import useUserContext from '@/hooks/useUserContext'
import getFriendStatus from '@/utils/freindsStatus'
import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'

type LazyLoadUserOverviewPopoverProps = {
  children: React.ReactNode
  userId: string
  name: string
  isEnableQuery: boolean
}

const LazyLoadUserOverviewPopover: FC<LazyLoadUserOverviewPopoverProps> = ({
  children,
  userId,
  name,
  isEnableQuery
}) => {
  const {
    value: { id: selfId }
  } = useUserContext()
  const { userDetail } = useGetUserDetail(userId, isEnableQuery)

  if (!userDetail) {
    return children
  }

  return (
    <UserOverviewPopover
      userId={userId}
      name={name}
      friendStatus={getFriendStatus({
        selfId,
        userId,
        isFriend: userDetail.isFriend
      })}
      commonFriendList={userDetail.commonFriendList}
    >
      {children}
    </UserOverviewPopover>
  )
}

export default LazyLoadUserOverviewPopover
