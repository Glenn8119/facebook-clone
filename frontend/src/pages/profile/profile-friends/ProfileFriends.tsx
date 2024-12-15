import { useSearchParams } from 'react-router-dom'

import Avatar from '@/components/Avatar'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import Card from '@/components/layout/Card'

import { ROUTES } from '@/constants/common'
import { PROFILE_QUERIES } from '@/constants/pages/profile'

import useFetchFriendListWithFriendStatus from '@/hooks/api/queries/useGetFriendList/useFetchFriendListWithFriendStatus'
import useNavigateTo from '@/hooks/useNavigateTo'

const ProfileFriends = () => {
  const navigate = useNavigateTo()
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string

  const { friendList } = useFetchFriendListWithFriendStatus(userId)

  if (!friendList) return null

  const friendBoxList = friendList.map((friend) => (
    <div
      key={friend.id}
      className='flex items-center h-28 p-4 border border-main rounded-lg'
    >
      <UserOverviewPopover
        avatarImage={friend.avatarImage}
        userId={friend.id}
        name={friend.name}
        friendStatus={friend.friendStatus}
        commonFriendList={friend.commonFriendList}
      >
        <Avatar
          className='mr-4 rounded w-20 h-20 cursor-pointer'
          imgUrl={friend.avatarImage}
        />
      </UserOverviewPopover>

      <div className='flex flex-col justify-center'>
        <UserOverviewPopover
          avatarImage={friend.avatarImage}
          userId={friend.id}
          name={friend.name}
          friendStatus={friend.friendStatus}
          commonFriendList={friend.commonFriendList}
        >
          <div className='cursor-pointer hover:underline'>{friend.name}</div>
        </UserOverviewPopover>
        {friend.commonFriendList.length > 0 ? (
          <div
            className='text-sm text-slate-400 cursor-pointer'
            onClick={() =>
              navigate({
                pathname: ROUTES.PROFILE,
                queries: { tab: PROFILE_QUERIES.FRIENDS_MUTUAL, id: friend.id }
              })
            }
          >
            {friend.commonFriendList.length} 位共同朋友
          </div>
        ) : null}
      </div>
    </div>
  ))

  return (
    <Card className='p-4'>
      <div className='mb-4 flex'>
        <div className='font-semi-bold text-xl mr-auto'>朋友</div>
      </div>
      <div className='grid grid-cols-2 gap-1'>{friendBoxList}</div>
    </Card>
  )
}

export default ProfileFriends
