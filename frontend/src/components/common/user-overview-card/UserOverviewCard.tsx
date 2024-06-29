import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import Avatar from '@/components/Avatar'
import Button from '@/components/form/Button'
import { AnyFunction } from '@/types/common'
import { ButtonSize } from '@/types/component/button'
import { FC } from 'react'
import { MdGroup } from 'react-icons/md'
import { createSearchParams, useNavigate } from 'react-router-dom'

type UserOverviewCardProps = {
  name: string
  isFriend: boolean | null
  commonFriendList?: FERecommendationFriendSingleResponseType['commonFriendList']
  addFriend?: () => void
  handleClickAvatar?: AnyFunction
  handleClickName?: AnyFunction
}

const UserOverviewCard: FC<UserOverviewCardProps> = ({
  name,
  isFriend,
  commonFriendList,
  addFriend,
  handleClickAvatar,
  handleClickName
}) => {
  const navigate = useNavigate()
  const navigateToPersonalPage = (id: string) => {
    navigate({
      pathname: '/personal',
      search: createSearchParams({ id }).toString()
    })
  }
  const handleCommonFriendListDescription = (
    commonFriendList: FERecommendationFriendSingleResponseType['commonFriendList']
  ) => {
    if (!commonFriendList.length) {
      return null
    }

    if (commonFriendList.length === 1) {
      return (
        <div>
          1 位共同朋友：
          <span className='font-bold'>{commonFriendList[0].name}</span>
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
              onClick={() => navigateToPersonalPage(friend.id)}
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
        {isFriend === null ? (
          <Button size={ButtonSize.SMALL}>編輯個人檔案</Button>
        ) : isFriend ? (
          <Button size={ButtonSize.SMALL}>朋友</Button>
        ) : (
          <Button size={ButtonSize.SMALL} onClick={addFriend}>
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
          onClick={handleClickAvatar}
        />
        <div>
          <div className='mb-4 font-bold text-xl'>
            <span
              className=' cursor-pointer hover:underline'
              onClick={handleClickName}
            >
              {name}
            </span>
          </div>
          {isFriend === null || commonFriendDescription === null ? null : (
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
