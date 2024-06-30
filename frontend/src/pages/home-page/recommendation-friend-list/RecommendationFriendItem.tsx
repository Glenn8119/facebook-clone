import FriendApi from '@/api/friend'
import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Avatar from '@/components/Avatar'
import Popover from '@/components/Popover'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import UserOverviewCard from '@/components/common/user-overview-card/UserOverviewCard'
import Button from '@/components/form/Button'
import { ROUTES } from '@/constants/common'
import { ToastContext } from '@/context/ToastContextProvider'
import useNavigateTo from '@/hooks/useNavigateTo'
import { ButtonSize } from '@/types/component/button'
import { PopoverType } from '@/types/component/popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useContext } from 'react'
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
  const navigate = useNavigateTo()

  const cn = twMerge('flex items-center', className)
  const commonFriendList = recommendationFriend.commonFriendList.map(
    (recommendationFriend) => ({ ...recommendationFriend, isFriend: true })
  )
  const { mutate: addFriend } = useMutation({
    mutationFn: () => FriendApi.addFriend(recommendationFriend.id),
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
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
      <Popover
        type={PopoverType.HOVER}
        popOverElement={
          <UserOverviewCard
            handleClickAvatar={navigateToProfilePage}
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
          onClick={navigateToProfilePage}
        />
      </Popover>
      <div className='mr-auto'>
        <Popover
          type={PopoverType.HOVER}
          popOverElement={
            <UserOverviewCard
              handleClickAvatar={navigateToProfilePage}
              handleClickName={navigateToProfilePage}
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
            onClick={navigateToProfilePage}
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
