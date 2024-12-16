import Card from '@/components/layout/Card'
import { useSearchParams } from 'react-router-dom'
import Avatar from '@/components/Avatar'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'
import useFetchFriendListWithFriendStatus from '@/hooks/api/queries/useGetFriendList/useFetchFriendListWithFriendStatus'
import { PROFILE_QUERIES } from '@/constants/pages/profile'

const FriendArea = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const { friendList } = useFetchFriendListWithFriendStatus(userId)

  if (!friendList) return null

  const navigateToFriendPage = () => {
    setSearchParams({ id: userId, tab: PROFILE_QUERIES.FRIENDS })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const friendBoxList = friendList.slice(0, 9).map((friend) => (
    <div className='flex flex-col px-2' key={friend.id}>
      <LazyLoadUserOverviewPopover userId={friend.id}>
        <Avatar
          className='mr-4 rounded w-20 h-20 cursor-pointer'
          imgUrl={friend.avatarImage}
        />
      </LazyLoadUserOverviewPopover>
      <LazyLoadUserOverviewPopover userId={friend.id}>
        <div className='cursor-pointer hover:underline'>{friend.name}</div>
      </LazyLoadUserOverviewPopover>
    </div>
  ))

  return (
    <div className='basis-92'>
      <Card>
        <div className='flex items-center'>
          <div className='text-xl font-bold mr-auto'>朋友</div>
          <div
            className='text-blue-500 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded'
            onClick={() => navigateToFriendPage()}
          >
            查看所有朋友
          </div>
        </div>
        <div className='text-slate-600'>{friendList.length} 位朋友</div>
        <div className='p-2 grid grid-cols-3 gap-4 w-92'>{friendBoxList}</div>
      </Card>
    </div>
  )
}

export default FriendArea
