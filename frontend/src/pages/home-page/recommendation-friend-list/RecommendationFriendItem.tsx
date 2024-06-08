import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import Button from '@/components/form/Button'
import { ButtonSize } from '@/types/component/button'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type FriendItemProps = {
  recommendationFriend: FERecommendationFriendSingleResponseType
  className: string
}

const mockAvatarInfoList = [{}, {}]

const RecommendationFriendItem: FC<FriendItemProps> = ({
  recommendationFriend,
  className
}) => {
  const cn = twMerge('flex items-center', className)

  return (
    <div className={cn}>
      <Avatar className='mr-2' />
      <div className='mr-auto'>
        <div>{recommendationFriend.name}</div>
        <div className='flex flex-nowrap items-center min-w-28'>
          <CollapsingAvatarList
            className='mr-1'
            avatarClassName='w-4 h-4'
            avatarInfoList={mockAvatarInfoList}
          />
          <div className='text-slate-400 text-sm whitespace-nowrap'>
            2 位共同朋友
          </div>
        </div>
      </div>
      <Button size={ButtonSize.SMALL} className='w-36'>
        加朋友
      </Button>
    </div>
  )
}

export default RecommendationFriendItem
