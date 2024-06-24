import FriendApi from '@/api/friend'
import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Avatar from '@/components/Avatar'
import Popover from '@/components/Popover'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import UserOverviewCard from '@/components/common/user-overview-card/UserOverviewCard'
import Button from '@/components/form/Button'
import { ToastContext } from '@/context/ToastContextProvider'
import { ButtonSize } from '@/types/component/button'
import { PopoverType } from '@/types/component/popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useContext } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
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
  const { addToast } = useContext(ToastContext)
  const navigate = useNavigate()

  const cn = twMerge('flex items-center', className)
  const commonFriendList = recommendationFriend.commonFriendList
  const { mutate: addFriend } = useMutation({
    mutationFn: () => FriendApi.addFriend(recommendationFriend.id),
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })

  const directToPersonalPage = () => {
    navigate({
      pathname: '/personal',
      search: createSearchParams({
        id: recommendationFriend.id
      }).toString()
    })
  }

  return (
    <div className={cn}>
      <Popover
        type={PopoverType.HOVER}
        popOverElement={
          <UserOverviewCard
            handleClickAvatar={directToPersonalPage}
            addFriend={addFriend}
            name={recommendationFriend.name}
            isFriend={false}
            commonFriendList={commonFriendList}
          />
        }
        popOverClass='animate-fade-in'
      >
        <Avatar
          className='mr-2 cursor-pointer'
          onClick={directToPersonalPage}
        />
      </Popover>
      <div className='mr-auto'>
        <Popover
          type={PopoverType.HOVER}
          popOverElement={
            <UserOverviewCard
              handleClickAvatar={directToPersonalPage}
              handleClickName={directToPersonalPage}
              addFriend={addFriend}
              name={recommendationFriend.name}
              isFriend={false}
              commonFriendList={commonFriendList}
            />
          }
          popOverClass='animate-fade-in'
        >
          <div
            className='cursor-pointer hover:underline'
            onClick={directToPersonalPage}
          >
            {recommendationFriend.name}
          </div>
        </Popover>
        {commonFriendList.length ? (
          <div className='flex flex-nowrap items-center min-w-28'>
            <CollapsingAvatarList
              className='mr-1'
              avatarClassName='w-4 h-4'
              // TODO: add imgUrl to user info
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
        onClick={() => addFriend()}
      >
        加朋友
      </Button>
    </div>
  )
}

export default RecommendationFriendItem
