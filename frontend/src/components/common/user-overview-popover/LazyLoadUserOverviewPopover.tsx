import { FC, useState } from 'react'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import useUserContext from '@/hooks/useUserContext'
import getFriendStatus from '@/utils/freindsStatus'
import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'

type LazyLoadUserOverviewPopoverProps = {
  children: React.ReactNode
  userId: string
}

const LazyLoadUserOverviewPopover: FC<LazyLoadUserOverviewPopoverProps> = ({
  children,
  userId
}) => {
  const [isEnableQuery, setEnableQuery] = useState(false)
  const {
    value: { id: selfId }
  } = useUserContext()
  const { userDetail } = useGetUserDetail(userId, isEnableQuery)

  if (!userDetail) {
    return <div onMouseEnter={() => setEnableQuery(true)}>{children}</div>
  }

  return (
    <UserOverviewPopover
      avatarImage={userDetail.avatarImage}
      company={userDetail.company}
      userId={userId}
      name={userDetail.name}
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
