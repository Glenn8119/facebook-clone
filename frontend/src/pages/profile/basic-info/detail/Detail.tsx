import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import Button from '@/components/form/Button'
import { ROUTES } from '@/constants/common'
import { PROFILE_QUERIES } from '@/constants/pages/profile'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useGetFriendList from '@/hooks/api/useGetFriendList'
import useGetUserDetail from '@/hooks/api/useGetUserDetail'
import useNavigateTo from '@/hooks/useNavigateTo'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { useQueryClient } from '@tanstack/react-query'
import { MdEdit } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const {
    value: { id: selfId }
  } = useUserContext()
  const navigate = useNavigateTo()
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()
  const { userDetail } = useGetUserDetail(userId)
  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
    }
  })
  const { friendList: userFriendList } = useGetFriendList(userId)
  const { friendList: selfFriendList } = useGetFriendList(selfId)
  const isUserSelf = selfId === searchParams.get('id')

  if (!userFriendList || !selfFriendList || !userDetail) {
    return null
  }

  const isFriend = !!selfFriendList.find((friend) => friend.id === userId)
  const renderedFriendList = userFriendList.map((friend) => ({
    ...friend,
    isFriend: !!selfFriendList.find((selfFriend) => friend.id === selfFriend.id)
  }))

  const navigateToFriendsOrMutualFriends = (isToMutual?: boolean) => {
    navigate({
      pathname: ROUTES.PROFILE,
      queries: {
        id: userId,
        tab: isToMutual
          ? PROFILE_QUERIES.FRIENDS_MUTUAL
          : PROFILE_QUERIES.FRIENDS
      }
    })
  }

  const renderFriendDescription = () => {
    if (isUserSelf) {
      return (
        <div
          className='hover:underline cursor-pointer'
          onClick={() => navigateToFriendsOrMutualFriends()}
        >
          {renderedFriendList?.length ?? ''} 位朋友
        </div>
      )
    }

    if (isFriend) {
      return (
        <div>
          <span
            className='hover:underline cursor-pointer'
            onClick={() => navigateToFriendsOrMutualFriends()}
          >
            {renderedFriendList.length} 位朋友
          </span>
          ，
          <span
            className='hover:underline cursor-pointer'
            onClick={() => navigateToFriendsOrMutualFriends(true)}
          >
            {userDetail.commonFriendList.length} 位共同朋友
          </span>
        </div>
      )
    }

    return (
      <div
        className='hover:underline cursor-pointer'
        onClick={() => navigateToFriendsOrMutualFriends(true)}
      >
        {userDetail.commonFriendList.length} 位共同朋友
      </div>
    )
  }

  return (
    <div className='flex items-end h-36 relative pb-4 border-b border-slate-300'>
      <div className='absolute bottom-4 left-0 border-white border-4 rounded-full'>
        <Avatar className='w-40 h-40' />
      </div>
      <div className='basis-44' />
      <div className='flex-grow py-2'>
        <div className='font-bold text-4xl mb-1'>{userDetail.name}</div>
        <div className='text-slate-600 mb-1'>{renderFriendDescription()}</div>
        <CollapsingAvatarList
          addFriend={addFriend}
          handleClickList={navigateToFriendsOrMutualFriends}
          avatarInfoList={renderedFriendList ?? []}
        />
      </div>
      <div className='flex-grow py-2'>
        <Button
          size={ButtonSize.SMALL}
          className='w-auto px-4'
          variant={ButtonVariant.AUXILIARY}
          IconElement={MdEdit}
        >
          編輯個人檔案
        </Button>
      </div>
    </div>
  )
}

export default Detail
