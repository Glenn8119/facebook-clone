import Avatar from '@/components/Avatar'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import Input from '@/components/form/Input'
import Card from '@/components/layout/Card'
import { ROUTES } from '@/constants/common'
import { PROFILE_QUERIES } from '@/constants/pages/profile'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useFetchFriendListWithFriendStatus from '@/hooks/api/queries/useGetFriendList/useFetchFriendListWithFriendStatus'
import useNavigateTo from '@/hooks/useNavigateTo'
import useToastContext from '@/hooks/userToastContext'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const ProfileFriends = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigateTo()
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const { addToast } = useToastContext()
  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })

  const { friendList } = useFetchFriendListWithFriendStatus(userId)

  const navigateToProfilePage = (id: string, tab?: string) => {
    const queries = { id } as Record<string, string>
    tab && (queries.tab = tab)
    navigate({
      pathname: ROUTES.PROFILE,
      queries
    })
  }

  if (!friendList) return null

  const friendBoxList = friendList.map((friend) => (
    <div
      key={friend.id}
      className='flex items-center h-28 p-4 border border-main rounded-lg'
    >
      <UserOverviewPopover
        userId={friend.id}
        addFriend={() => addFriend(friend.id)}
        name={friend.name}
        friendStatus={friend.friendStatus}
        commonFriendList={friend.commonFriendList}
      >
        <Avatar
          className='mr-4 rounded w-20 cursor-pointer'
          onClick={() => navigateToProfilePage(friend.id)}
        />
      </UserOverviewPopover>

      <div className='flex flex-col justify-center'>
        <UserOverviewPopover
          userId={friend.id}
          addFriend={() => addFriend(friend.id)}
          name={friend.name}
          friendStatus={friend.friendStatus}
          commonFriendList={friend.commonFriendList}
        >
          <div
            className='cursor-pointer hover:underline'
            onClick={() => navigateToProfilePage(friend.id)}
          >
            {friend.name}
          </div>
        </UserOverviewPopover>
        {friend.commonFriendList.length > 0 ? (
          <div
            className='text-sm text-slate-400 cursor-pointer'
            onClick={() =>
              navigateToProfilePage(friend.id, PROFILE_QUERIES.FRIENDS_MUTUAL)
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
        <Input
          className='w-52 h-9 rounded-full bg-gray-100 border-none'
          placeholder='搜尋'
        />
      </div>
      <div className='grid grid-cols-2 gap-1'>{friendBoxList}</div>
    </Card>
  )
}

export default ProfileFriends
