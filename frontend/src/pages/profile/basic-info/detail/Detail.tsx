import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import Button from '@/components/form/Button'
import { ROUTES } from '@/constants/common'
import { PROFILE_QUERIES } from '@/constants/pages/profile'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useFetchFriendListWithFriendStatus from '@/hooks/api/queries/useGetFriendList/useFetchFriendListWithFriendStatus'
import useGetFriendList from '@/hooks/api/queries/useGetFriendList'
import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'
import useNavigateTo from '@/hooks/useNavigateTo'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { FriendStatus } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import getFriendStatus from '@/utils/freindsStatus'
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
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })
  const { friendList: selfFriendList } = useGetFriendList(selfId)
  const { friendList: userFriendList } =
    useFetchFriendListWithFriendStatus(userId)

  if (!userFriendList || !selfFriendList || !userDetail) {
    return null
  }

  const friendStatus = getFriendStatus({ selfFriendList, selfId, userId })

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
    if (FriendStatus.IsSelf) {
      return (
        <div
          className='hover:underline cursor-pointer'
          onClick={() => navigateToFriendsOrMutualFriends()}
        >
          {userFriendList?.length ?? ''} 位朋友
        </div>
      )
    }

    if (friendStatus === FriendStatus.IsFriend) {
      return (
        <div>
          <span
            className='hover:underline cursor-pointer'
            onClick={() => navigateToFriendsOrMutualFriends()}
          >
            {userFriendList.length} 位朋友
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
          avatarInfoList={userFriendList ?? []}
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
