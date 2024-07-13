import Avatar from '@/components/Avatar'
import { FC, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdMoreHoriz } from 'react-icons/md'
import Popover from '@/components/Popover'
import Modal from '@/components/Modal'
import CommentDotAction from '@/components/common/post-area/post-list/post/comment/CommentDotAction'
import Button from '@/components/form/Button'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import Input, { ForwardedInputRefType } from '@/components/form/Input'

type CommentProps = {
  isHoverShowDots: boolean
  content: string
  name: string
  createAt: string
  hasEdited: boolean
  className?: string
  onDeletePostComment: () => Promise<void>
  onEditPostComment: (content: string) => Promise<void>
}

const Comment: FC<CommentProps> = ({
  isHoverShowDots,
  hasEdited,
  className,
  content,
  name,
  createAt,
  onDeletePostComment,
  onEditPostComment
}) => {
  const [isHovered, setHoverState] = useState(false)
  const [isHidePopover, setHidePopover] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [editInput, setEditInput] = useState(content)
  const [isInputFocused, setInputFocused] = useState(false)
  const inputRef = useRef<ForwardedInputRefType | null>(null)
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
    setHidePopover(true)
    // wait for value assignment for inputRef
    setTimeout(() => {
      inputRef.current && inputRef.current.focus()
    })
  }

  const handleEnterKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && editInput) {
      if (content !== editInput) {
        await onEditPostComment(editInput)
      }
      setEditing(false)
      setHidePopover(false)
    }
  }

  const handleCancelEditing = () => {
    setEditing(false)
    setHidePopover(false)
  }

  const cn = twMerge('flex items-start', className)

  useEffect(() => {
    const handleESCKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInputFocused) {
        setEditing(false)
        setHidePopover(false)
      }
    }

    document.addEventListener('keydown', handleESCKeyDown)
    return () => document.removeEventListener('keydown', handleESCKeyDown)
  }, [isInputFocused])

  return (
    <div
      className={cn}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar className='mr-2' />
      <div className={`flex flex-col mr-2 ${isEditing && 'flex-grow'}`}>
        {isEditing ? (
          <div>
            <Input
              ref={(ref) => (inputRef.current = ref)}
              className='flex-grow h-8 mb-1 border-none rounded-full bg-main'
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              onKeyDown={handleEnterKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
            <div className='text-xs'>
              {isInputFocused ? <span>按 ESC 鍵可</span> : null}
              <span
                className='text-blue-600 hover:underline cursor-pointer'
                // use mousedown event make the event happen before input blur.
                onMouseDown={handleCancelEditing}
              >
                取消
              </span>
            </div>
          </div>
        ) : (
          <div className='bg-main rounded-2xl py-2 px-3 text-15 w-min max-w-72 break-words'>
            <div className='cursor-pointer font-bold hover:underline'>
              {name}
            </div>
            <div>{content}</div>
          </div>
        )}
        {isEditing ? null : (
          <div className='pl-3 text-13 text-gray-500'>
            <span className='font-light  mr-3'>{createAt}</span>
            {hasEdited ? (
              <span className='font-light  mr-3'>已編輯</span>
            ) : null}
          </div>
        )}
      </div>
      {isHovered && isHoverShowDots ? (
        // TODO: popover position
        <Popover
          hidePopover={isHidePopover}
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
