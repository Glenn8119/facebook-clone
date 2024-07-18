import { FC } from 'react'

import Avatar from '@/components/Avatar'
import Button from '@/components/form/Button'

import { ROUTES } from '@/constants/common'

import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useNavigateTo from '@/hooks/useNavigateTo'

import { FriendStatus } from '@/types/common'
import { ButtonSize } from '@/types/component/button'

import { MdGroup } from 'react-icons/md'

import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'

type UserOverviewCardProps = {
  userId: string
  name: string
  friendStatus: FriendStatus
  commonFriendList?: FERecommendationFriendSingleResponseType['commonFriendList']
}

const UserOverviewCard: FC<UserOverviewCardProps> = ({
  userId,
  name,
  friendStatus,
  commonFriendList
}) => {
  const navigate = useNavigateTo()
  const { addFriend } = useAddFriend()
  const navigateToProfilePage = (id: string) => {
    navigate({
      pathname: ROUTES.PROFILE,
      queries: { id }
    })
  }
  const handleCommonFriendListDescription = (
    commonFriendList: FERecommendationFriendSingleResponseType['commonFriendList']
  ) => {
    if (!commonFriendList.length || friendStatus === FriendStatus.IsSelf) {
      return null
    }

    if (commonFriendList.length === 1) {
      return (
        <div>
          1 位共同朋友：
          <span
            className='font-bold cursor-pointer hover:underline'
            onClick={() => {
              navigateToProfilePage(commonFriendList[0].id)
            }}
          >
            {commonFriendList[0].name}
          </span>
        </div>
      )
    }

    return (
      <div>
        {commonFriendList.length} 位共同朋友，包括
        {commonFriendList.slice(0, 2).map((friend, idx) => (
          <span key={friend.id} className='font-bold'>
            <span
              className='hover:underline cursor-pointer'
              onClick={() => navigateToProfilePage(friend.id)}
            >
              {friend.name}
            </span>
            {idx === 0 ? '和' : null}
          </span>
        ))}
      </div>
    )
  }

  const commonFriendDescription = commonFriendList
    ? handleCommonFriendListDescription(commonFriendList)
    : null

  const renderFunctionButtons = () => {
    return (
      <div>
        {friendStatus === FriendStatus.IsSelf ? (
          <Button size={ButtonSize.SMALL}>編輯個人檔案</Button>
        ) : friendStatus === FriendStatus.IsFriend ? (
          <Button size={ButtonSize.SMALL}>朋友</Button>
        ) : (
          <Button
            size={ButtonSize.SMALL}
            onClick={() => addFriend && addFriend(userId)}
          >
            加朋友
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className='w-92 p-1'>
      <div className='flex mb-3'>
        <Avatar
          className='mr-2 w-24 h-24 cursor-pointer'
          onClick={(e) => {
            e.stopPropagation()
            navigateToProfilePage(userId)
          }}
        />
        <div>
          <div className='mb-4 font-bold text-xl'>
            <span
              className=' cursor-pointer hover:underline'
              onClick={(e) => {
                e.stopPropagation()
                navigateToProfilePage(userId)
              }}
            >
              {name}
            </span>
          </div>
          {friendStatus === null || commonFriendDescription === null ? null : (
            <div className='flex items-start mb-2'>
              <MdGroup className='mr-2 -mt-1' color='gray' size={32} />
              {commonFriendDescription}
            </div>
          )}
          {/* TODO: basic info */}
          <div>曾在 Mock 公司工作</div>
        </div>
      </div>
      {renderFunctionButtons()}
    </div>
  )
}

export default UserOverviewCard
