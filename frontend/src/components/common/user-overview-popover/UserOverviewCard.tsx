import { FC, useState } from 'react'

import Avatar from '@/components/Avatar'
import Button from '@/components/form/Button'
import ConfirmModal from '@/components/common/ConfirmModal'

import { ROUTES } from '@/constants/common'

import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useNavigateTo from '@/hooks/useNavigateTo'

import { FriendStatus, SetStateType } from '@/types/common'
import { ButtonSize } from '@/types/component/button'

import { FERecommendationFriendSingleResponseType } from '@/api/friend/schema'
import useDeleteFriend from '@/hooks/api/mutation/useDeleteFriend'

type UserOverviewCardProps = {
  userId: string
  name: string
  friendStatus: FriendStatus
  commonFriendList?: FERecommendationFriendSingleResponseType['commonFriendList']
}

const FunctionButtons = ({
  friendStatus,
  setDeleteFriendConfirm,
  userId,
  addFriend
}: {
  friendStatus: FriendStatus
  setDeleteFriendConfirm: SetStateType<boolean>
  userId: string
  addFriend: (userId: string) => void
}) => {
  return (
    <div>
      {friendStatus === FriendStatus.IS_SELF ? (
        <Button size={ButtonSize.SMALL}>編輯個人檔案</Button>
      ) : friendStatus === FriendStatus.IS_FRIEND ? (
        <Button
          size={ButtonSize.SMALL}
          onClick={() => setDeleteFriendConfirm(true)}
        >
          朋友
        </Button>
      ) : (
        <Button size={ButtonSize.SMALL} onClick={() => addFriend(userId)}>
          加朋友
        </Button>
      )}
    </div>
  )
}

const CommonFriendListDescription = ({
  commonFriendList,
  friendStatus,
  navigateToProfilePage
}: {
  commonFriendList: FERecommendationFriendSingleResponseType['commonFriendList']
  friendStatus: FriendStatus
  navigateToProfilePage: (userId: string) => void
}) => {
  if (!commonFriendList.length || friendStatus === FriendStatus.IS_SELF) {
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

const UserOverviewCard: FC<UserOverviewCardProps> = ({
  userId,
  name,
  friendStatus,
  commonFriendList
}) => {
  const [isDeleteFriendConfirmShow, setDeleteFriendConfirm] = useState(false)
  const navigate = useNavigateTo()
  const { addFriend } = useAddFriend()
  const { deleteFriend } = useDeleteFriend()
  const navigateToProfilePage = (id: string) => {
    navigate({
      pathname: ROUTES.PROFILE,
      queries: { id }
    })
  }

  const handleConfirmDeleteFriend = async () => {
    await deleteFriend(userId)
    setDeleteFriendConfirm(false)
  }

  return (
    <>
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
            {commonFriendList ? (
              <CommonFriendListDescription
                friendStatus={friendStatus}
                commonFriendList={commonFriendList}
                navigateToProfilePage={navigateToProfilePage}
              />
            ) : null}
            {/* TODO: basic info */}
            <div>曾在 Mock 公司工作</div>
          </div>
        </div>
        <FunctionButtons
          friendStatus={friendStatus}
          userId={userId}
          setDeleteFriendConfirm={setDeleteFriendConfirm}
          addFriend={addFriend}
        />
      </div>
      {isDeleteFriendConfirmShow ? (
        <ConfirmModal
          cancelLabel='取消'
          confirmLabel='確認'
          title={`與${name}解除朋友關係`}
          description={`你確定要將${name}從朋友名單中移除嗎?`}
          onConfirm={handleConfirmDeleteFriend}
          onCancel={() => setDeleteFriendConfirm(false)}
          closeModal={() => setDeleteFriendConfirm(false)}
        />
      ) : null}
    </>
  )
}

export default UserOverviewCard
