import Avatar from '@/components/Avatar'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import Input from '@/components/form/Input'
import Card from '@/components/layout/Card'
import { ROUTES } from '@/constants/common'
import { PROFILE_QUERIES } from '@/constants/pages/profile'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useGetFriendList from '@/hooks/api/useGetFriendList'
import useNavigateTo from '@/hooks/useNavigateTo'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const ProfileFriends = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigateTo()
  const [searchParams] = useSearchParams()
  const { addToast } = useToastContext()
  const {
    value: { id: selfId }
  } = useUserContext()
  const { friendList: selfFriendList } = useGetFriendList(selfId)
  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })

  const { friendList } = useGetFriendList(searchParams.get('id') as string)
  const navigateToProfilePage = (id: string, tab?: string) => {
    const queries = { id } as Record<string, string>
    tab && (queries.tab = tab)
    navigate({
      pathname: ROUTES.PROFILE,
      queries
    })
  }

  if (!friendList || !selfFriendList) return null
  const renderedFriendList = friendList.map((friend) => ({
    ...friend,
    isFriend: !!selfFriendList.find((selfFriend) => friend.id === selfFriend.id)
  }))

  const friendBoxList = renderedFriendList.map((friend) => (
    <div
      key={friend.id}
      className='flex items-center h-28 p-4 border border-main rounded-lg'
    >
      <UserOverviewPopover
        userId={friend.id}
        addFriend={() => addFriend(friend.id)}
        name={friend.name}
        isFriend={friend.isFriend}
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
          isFriend={friend.isFriend}
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
