import Avatar from '@/components/Avatar'
import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdMoreHoriz } from 'react-icons/md'
import Popover from '@/components/Popover'
import Modal from '@/components/Modal'
import CommentDotAction from '@/components/common/post-area/post-list/post/CommentDotAction'
import Button from '@/components/form/Button'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { AnyFunction } from '@/types/common'
import Input from '@/components/form/Input'

type CommentProps = {
  isHoverShowDots: boolean
  content: string
  name: string
  createAt: string
  className?: string
  onDeletePostComment: AnyFunction
}

const Comment: FC<CommentProps> = ({
  isHoverShowDots,
  className,
  content,
  name,
  createAt,
  onDeletePostComment
}) => {
  const [isHovered, setHoverState] = useState(false)
  const [isShowPopover, setShowPopover] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isEdiding, setEditing] = useState(false)
  const handleDeleteComment = async () => {
    await onDeletePostComment()
    setShowConfirmModal(false)
  }

  const handleMouseEnter = () => {
    setHoverState(true)
  }

  const handleMouseLeave = () => {
    setHoverState(false)
  }

  const handleStartEdit = () => {
    setEditing(true)
    setShowPopover(false)
  }

  const cn = twMerge('flex items-start', className)
  return (
    <div
      className={cn}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar className='mr-2' />
      <div className={`flex flex-col mr-2 ${isEdiding && 'flex-grow'}`}>
        {isEdiding ? (
          <Input className='flex-grow' />
        ) : (
          <div className='bg-main rounded-2xl py-2 px-3 text-15 w-min max-w-72 break-words'>
            <div className='cursor-pointer font-bold hover:underline'>
              {name}
            </div>
            <div>{content}</div>
          </div>
        )}
        <div className='pl-3 text-13 text-gray-500'>
          <span className='font-light  mr-3'>{createAt}</span>
        </div>
      </div>
      {isHovered && isHoverShowDots ? (
        // TODO: popover position
        <Popover
          showPopover={isShowPopover}
          popOverElement={
            <CommentDotAction
              handleDelete={() => setShowConfirmModal(true)}
              handleEdit={handleStartEdit}
            />
          }
          containerClass='self-center -translate-y-3 '
        >
          <MdMoreHoriz className='cursor-pointer' size={18} />
        </Popover>
      ) : null}
      {showConfirmModal ? (
        <Modal onCloseModal={() => setShowConfirmModal(false)}>
          <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
            刪除留言？
          </div>
          <div className='p-4'>
            <div className='mb-8'>確定要刪除這則留言嗎？</div>
            <div className='flex justify-end'>
              <Button
                size={ButtonSize.SMALL}
                className='w-10 mr-2'
                variant={ButtonVariant.AUXILIARY}
                onClick={() => setShowConfirmModal(false)}
              >
                否
              </Button>
              <Button
                size={ButtonSize.SMALL}
                className='w-28'
                onClick={handleDeleteComment}
              >
                刪除
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default Comment
