import { useSearchParams } from 'react-router-dom'

import Avatar from '@/components/Avatar'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'
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
      <LazyLoadUserOverviewPopover userId={friend.id}>
        <Avatar
          className='mr-4 rounded w-20 h-20 cursor-pointer'
          imgUrl={friend.avatarImage}
        />
      </LazyLoadUserOverviewPopover>

      <div className='flex flex-col justify-center'>
        <LazyLoadUserOverviewPopover userId={friend.id}>
          <div className='cursor-pointer hover:underline'>{friend.name}</div>
        </LazyLoadUserOverviewPopover>
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
