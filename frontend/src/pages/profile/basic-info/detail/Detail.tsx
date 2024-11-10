import { useSearchParams } from 'react-router-dom'

import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import Button from '@/components/form/Button'

import { ROUTES } from '@/constants/common'
import { PROFILE_QUERIES } from '@/constants/pages/profile'

import useFetchFriendListWithFriendStatus from '@/hooks/api/queries/useGetFriendList/useFetchFriendListWithFriendStatus'
import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'
import useNavigateTo from '@/hooks/useNavigateTo'
import useUserContext from '@/hooks/useUserContext'

import { FriendStatus } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'

import getFriendStatus from '@/utils/freindsStatus'

import { MdEdit } from 'react-icons/md'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const {
    value: { id: selfId }
  } = useUserContext()
  const navigate = useNavigateTo()
  const { userDetail } = useGetUserDetail(userId)
  const { friendList: userFriendList } =
    useFetchFriendListWithFriendStatus(userId)

  if (!userFriendList || !userDetail) {
    return null
  }

  const friendStatus = getFriendStatus({
    selfId,
    userId,
    isFriend: userDetail.isFriend
  })

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
    if (friendStatus === FriendStatus.IsSelf) {
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
          {userDetail.commonFriendList.length ? (
            <span
              className='hover:underline cursor-pointer'
              onClick={() => navigateToFriendsOrMutualFriends(true)}
            >
              ，{userDetail.commonFriendList.length} 位共同朋友
            </span>
          ) : null}
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
