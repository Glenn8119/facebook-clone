import { FEFriendSingleResponseType } from '@/api/friend/schema'

import { FC } from 'react'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import useGetCommonFriendList from '@/hooks/api/queries/useGetFriendList/useGetCommonFriendList'
import { useQueryClient } from '@tanstack/react-query'
import useUserContext from '@/hooks/useUserContext'
import getFriendStatus from '@/utils/freindsStatus'

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
  const queryClient = useQueryClient()
  const { commonFriendList } = useGetCommonFriendList(userId, isEnableQuery)
  const selfFriendList = queryClient.getQueryData<FEFriendSingleResponseType[]>(
    ['getFriendList', selfId]
  )

  if (!commonFriendList || !selfFriendList) {
    return children
  }

  return (
    <UserOverviewPopover
      userId={userId}
      name={name}
      friendStatus={getFriendStatus({ selfId, userId, selfFriendList })}
      commonFriendList={commonFriendList}
    >
      {children}
    </UserOverviewPopover>
  )
}

export default LazyLoadUserOverviewPopover
