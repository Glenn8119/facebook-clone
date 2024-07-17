import Avatar from '@/components/Avatar'
import Modal from '@/components/Modal'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'
import Button from '@/components/form/Button'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import useUserContext from '@/hooks/useUserContext'
import useToastContext from '@/hooks/userToastContext'
import { Post } from '@/types/api/post'
import { FriendStatus } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type LikerListModalProps = {
  likerList: Post['likerList']
  closeModal: () => void
}

const Liker = ({
  liker,
  className,
  addFriend
}: {
  liker: Post['likerList'][number]
  className: string
  addFriend: () => void
}) => {
  const cn = twMerge('flex items-center', className)
  const [isEnableLoadPopover, setEnableLoadPopover] = useState(false)
  return (
    <div className={cn}>
      <LazyLoadUserOverviewPopover
        userId={liker.id}
        name={liker.name}
        isEnableQuery={isEnableLoadPopover}
      >
        <Avatar
          className='mr-2 hover:underline cursor-pointer'
          onMouseEnter={() => setEnableLoadPopover(true)}
        />
      </LazyLoadUserOverviewPopover>
      <LazyLoadUserOverviewPopover
        userId={liker.id}
        name={liker.name}
        isEnableQuery={isEnableLoadPopover}
      >
        <span
          className='mr-auto hover:underline cursor-pointer'
          onMouseEnter={() => setEnableLoadPopover(true)}
        >
          {liker.name}
        </span>
      </LazyLoadUserOverviewPopover>
      {liker.friendStatus === FriendStatus.IsNotFriend ? (
        <Button
          size={ButtonSize.SMALL}
          variant={ButtonVariant.AUXILIARY}
          className='w-20'
          onClick={addFriend}
        >
          加朋友
        </Button>
      ) : null}
    </div>
  )
}

const LikerListModal: FC<LikerListModalProps> = ({ closeModal, likerList }) => {
  const { addToast } = useToastContext()
  const queryClient = useQueryClient()
  const {
    value: { id: selfId }
  } = useUserContext()
  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
      queryClient.invalidateQueries({ queryKey: ['friendRecommendation'] })
    }
  })

  const likerListRender = likerList.map((liker) => {
    return (
      <Liker
        key={liker.id}
        liker={liker}
        className='mb-4'
        addFriend={() => addFriend(liker.id)}
      />
    )
  })

  return (
    <Modal onCloseModal={closeModal} modalClassName='w-137 h-110'>
      <div className='h-15 text-center text-xl font-bold p-4 border-b border-slate-200'>
        說讚的人
      </div>
      <div className='p-4'>{likerListRender}</div>
    </Modal>
  )
}

export default LikerListModal
