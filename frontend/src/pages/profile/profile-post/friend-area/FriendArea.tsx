import Card from '@/components/layout/Card'
import { useSearchParams } from 'react-router-dom'
import Avatar from '@/components/Avatar'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import useFetchFriendListWithFriendStatus from '@/hooks/api/queries/useGetFriendList/useFetchFriendListWithFriendStatus'

const FriendArea = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const { friendList } = useFetchFriendListWithFriendStatus(userId)

  if (!friendList) return null

  const friendBoxList = friendList.map((friend) => (
    <div className='flex flex-col px-2' key={friend.id}>
      <UserOverviewPopover
        userId={friend.id}
        name={friend.name}
        friendStatus={friend.friendStatus}
        commonFriendList={friend.commonFriendList}
      >
        <Avatar className='mr-4 rounded w-20 h-20 cursor-pointer' />
      </UserOverviewPopover>
      <UserOverviewPopover
        userId={friend.id}
        name={friend.name}
        friendStatus={friend.friendStatus}
        commonFriendList={friend.commonFriendList}
      >
        <div className='cursor-pointer hover:underline'>{friend.name}</div>
      </UserOverviewPopover>
    </div>
  ))

  return (
    <div className='basis-92'>
      <Card>
        <div className='text-xl font-bold'>朋友</div>
        <div className='text-slate-600'>{friendList.length} 位朋友</div>
        <div className='p-2 grid grid-cols-3 gap-4 w-92'>{friendBoxList}</div>
      </Card>
    </div>
  )
}

export default FriendArea
