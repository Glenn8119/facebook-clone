import Card from '@/components/layout/Card'
import { FC } from 'react'
import fakeAvatar from '@/assets/fake-avatar.jpeg'
import useGetFriendList from '@/hooks/api/useGetFriendList'
import { useSearchParams } from 'react-router-dom'
import Avatar from '@/components/Avatar'
import Popover from '@/components/Popover'
import { PopoverType } from '@/types/component/popover'
import UserOverviewCard from '@/components/common/user-overview-card/UserOverviewCard'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FriendApi from '@/api/friend'
import useToastContext from '@/hooks/userToastContext'
import useUserContext from '@/hooks/useUserContext'
import { ROUTES } from '@/constants/common'
import useNavigateTo from '@/hooks/useNavigateTo'

interface FriendAreaProps {}

const FriendArea: FC<FriendAreaProps> = () => {
  const [searchParams] = useSearchParams()
  const { addToast } = useToastContext()
  const queryClient = useQueryClient()
  const navigate = useNavigateTo()
  const { friendList } = useGetFriendList(searchParams.get('id') as string)
  const {
    value: { id: selfId }
  } = useUserContext()
  const { friendList: selfFriendList } = useGetFriendList(selfId)
  const { mutate: addFriend } = useMutation({
    mutationFn: FriendApi.addFriend,
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })

  const navigateToProfilePage = (id: string) => {
    const queries = { id } as Record<string, string>
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
    <div className='flex flex-col px-2' key={friend.id}>
      <Popover
        type={PopoverType.HOVER}
        popOverElement={
          <UserOverviewCard
            userId={friend.id}
            addFriend={() => addFriend(friend.id)}
            name={friend.name}
            isFriend={friend.isFriend}
            commonFriendList={friend.commonFriendList}
          />
        }
        popOverClass='animate-fade-in'
      >
        <Avatar
          className='mr-4 rounded w-20 cursor-pointer'
          onClick={() => navigateToProfilePage(friend.id)}
        />
      </Popover>
      <Popover
        type={PopoverType.HOVER}
        popOverElement={
          <UserOverviewCard
            userId={friend.id}
            addFriend={() => addFriend(friend.id)}
            name={friend.name}
            isFriend={friend.isFriend}
            commonFriendList={friend.commonFriendList}
          />
        }
        popOverClass='animate-fade-in'
      >
        <div
          className='cursor-pointer hover:underline'
          onClick={() => navigateToProfilePage(friend.id)}
        >
          {friend.name}
        </div>
      </Popover>
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
