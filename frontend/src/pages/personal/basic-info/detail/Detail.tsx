import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import Button from '@/components/form/Button'
import { ROUTES } from '@/constants/common'
import { PERSONAL_QUERIES } from '@/constants/pages/personal'
import useGetFriendList from '@/hooks/api/useGetFriendList'
import useGetUserDetail from '@/hooks/api/useGetUserDetail'
import useUserContext from '@/hooks/useUserContext'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { MdEdit } from 'react-icons/md'
import {
  createSearchParams,
  useNavigate,
  useSearchParams
} from 'react-router-dom'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const {
    value: { id: selfId }
  } = useUserContext()
  const navigate = useNavigate()
  const { userDetail } = useGetUserDetail(userId)
  const { friendList: userFriendList } = useGetFriendList(userId)
  const { friendList: selfFriendList } = useGetFriendList(selfId)
  const isUserSelf = selfId === searchParams.get('id')

  if (!userFriendList || !selfFriendList || !userDetail) {
    return null
  }

  const isFriend = !!selfFriendList.find((friend) => friend.id === userId)
  const renderedFriendList = userFriendList.map((friend) => ({
    ...friend,
    isFriend: !!userFriendList.find((userFriend) => friend.id === userFriend.id)
  }))

  const navigateToFriendsOrMutualFriends = () => {
    const isToMutual = !isUserSelf && !isFriend

    navigate({
      pathname: ROUTES.PERSONAL,
      search: createSearchParams({
        id: userId,
        tab: isToMutual
          ? PERSONAL_QUERIES.FRIENDS_MUTUAL
          : PERSONAL_QUERIES.FRIENDS
      }).toString()
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
            onClick={() => navigateToFriendsOrMutualFriends()}
          >
            {userDetail.commonFriendList.length} 位共同朋友
          </span>
        </div>
      )
    }

    return (
      <div
        className='hover:underline cursor-pointer'
        onClick={() => navigateToFriendsOrMutualFriends()}
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
