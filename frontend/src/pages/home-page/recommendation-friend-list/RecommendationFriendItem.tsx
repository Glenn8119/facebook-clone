import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'
import Button from '@/components/form/Button'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import { FriendStatus } from '@/types/common'
import { ButtonSize } from '@/types/component/button'
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
  const cn = twMerge('flex items-center', className)
  const commonFriendList = recommendationFriend.commonFriendList.map(
    (recommendationFriend) => ({
      ...recommendationFriend,
      friendStatus: FriendStatus.IS_FRIEND
    })
  )
  const { addFriend } = useAddFriend()

  return (
    <div className={cn}>
      <LazyLoadUserOverviewPopover userId={recommendationFriend.id}>
        <Avatar
          className='mr-2 cursor-pointer'
          imgUrl={recommendationFriend.avatarImage}
        />
      </LazyLoadUserOverviewPopover>

      <div className='mr-auto'>
        <LazyLoadUserOverviewPopover userId={recommendationFriend.id}>
          <div className='cursor-pointer hover:underline'>
            {recommendationFriend.name}
          </div>
        </LazyLoadUserOverviewPopover>
        {commonFriendList.length ? (
          <div className='flex flex-nowrap items-center min-w-28'>
            <CollapsingAvatarList
              className='mr-1'
              avatarClassName='w-4 h-4'
              avatarInfoList={commonFriendList}
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
