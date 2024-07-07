import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import UserOverviewPopover from '@/components/common/user-overview-popover/UserOverviewPopover'
import Button from '@/components/form/Button'
import { ROUTES } from '@/constants/common'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useNavigateTo from '@/hooks/useNavigateTo'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { FriendStatus } from '@/types/common'
import { ButtonSize } from '@/types/component/button'
import { useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type FriendItemProps = {
  recommendationFriend: FERecommendationFriendSingleResponseType
  className: string
}

const RecommendationFriendItem: FC<FriendItemProps> = ({
  recommendationFriend,
  className
}) => {
  const queryClient = useQueryClient()
  const { addToast } = useToastContext()
  const {
    value: { id: selfId }
  } = useUserContext()
  const navigate = useNavigateTo()

  const cn = twMerge('flex items-center', className)
  const commonFriendList = recommendationFriend.commonFriendList.map(
    (recommendationFriend) => ({
      ...recommendationFriend,
      friendStatus: FriendStatus.IsFriend
    })
  )
  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
      queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
    }
  })

  const navigateToProfilePage = () => {
    navigate({
      pathname: ROUTES.PROFILE,
      queries: {
        id: recommendationFriend.id
      }
    })
  }

  return (
    <div className={cn}>
      <UserOverviewPopover
        userId={recommendationFriend.id}
        addFriend={addFriend}
        name={recommendationFriend.name}
        friendStatus={FriendStatus.IsNotFriend}
        commonFriendList={commonFriendList}
      >
        <Avatar
          className='mr-2 cursor-pointer'
          onClick={navigateToProfilePage}
        />
      </UserOverviewPopover>

      <div className='mr-auto'>
        <UserOverviewPopover
          userId={recommendationFriend.id}
          addFriend={addFriend}
          name={recommendationFriend.name}
          friendStatus={FriendStatus.IsNotFriend}
          commonFriendList={commonFriendList}
        >
          <div
            className='cursor-pointer hover:underline'
            onClick={navigateToProfilePage}
          >
            {recommendationFriend.name}
          </div>
        </UserOverviewPopover>
        {commonFriendList.length ? (
          <div className='flex flex-nowrap items-center min-w-28'>
            <CollapsingAvatarList
              className='mr-1'
              avatarClassName='w-4 h-4'
              // TODO: add imgUrl to user info
              avatarInfoList={commonFriendList}
              addFriend={addFriend}
            />
            <div className='text-slate-400 text-sm whitespace-nowrap'>
              {commonFriendList.length} 位共同朋友
            </div>
          </div>
        ) : null}
      </div>
      <Button
        size={ButtonSize.SMALL}
        className='w-36'
        onClick={() => addFriend(recommendationFriend.id)}
      >
        加朋友
      </Button>
    </div>
  )
}

export default RecommendationFriendItem
