import { FC, useEffect, useRef, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { MdMoreHoriz } from 'react-icons/md'

import Avatar from '@/components/Avatar'
import Popover from '@/components/Popover'
import MoreAction from '@/components/common/post-area/post-list/post/comment/MoreAction'
import Input, { ForwardedInputRefType } from '@/components/form/Input'
import ConfirmModal from '@/components/common/ConfirmModal'
import LazyLoadUserOverviewPopover from '@/components/common/user-overview-popover/LazyLoadUserOverviewPopover'
import useAddFriend from '@/hooks/api/mutation/useAddFriend'
import { useQueryClient } from '@tanstack/react-query'
import useToastContext from '@/hooks/userToastContext'
import useUserContext from '@/hooks/useUserContext'

type CommentProps = {
  userId: string
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
  userId,
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
  const [startLoadPopover, setStartLoadPopover] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [editInput, setEditInput] = useState(content)
  const [isInputFocused, setInputFocused] = useState(false)
  const inputRef = useRef<ForwardedInputRefType | null>(null)

  const queryClient = useQueryClient()
  const { addToast } = useToastContext()
  const {
    value: { id: selfId }
  } = useUserContext()
  const { addFriend } = useAddFriend({
    onSuccess: () => {
      addToast({ type: 'SUCCESS', title: '加入好友成功！' })
      queryClient.invalidateQueries({ queryKey: ['getFriendList', selfId] })
    }
  })
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
    }
  }

  const handleCancelEditing = () => {
    setEditing(false)
  }

  const cn = twMerge('flex items-start', className)

  useEffect(() => {
    const handleESCKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInputFocused) {
        setEditing(false)
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
      <LazyLoadUserOverviewPopover
        startLoad={startLoadPopover}
        userId={userId}
        name={name}
        addFriend={addFriend}
      >
        <Avatar
          className='mr-2 cursor-pointer'
          onMouseEnter={() => setStartLoadPopover(true)}
        />
      </LazyLoadUserOverviewPopover>
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
          <div className='flex items-center'>
            <div className='bg-main rounded-2xl py-2 px-3 mr-2 text-15 w-min max-w-72 break-words'>
              <LazyLoadUserOverviewPopover
                startLoad={startLoadPopover}
                userId={userId}
                name={name}
                addFriend={addFriend}
              >
                <div
                  className='cursor-pointer font-bold hover:underline'
                  onMouseEnter={() => setStartLoadPopover(true)}
                >
                  {name}
                </div>
              </LazyLoadUserOverviewPopover>
              <div>{content}</div>
            </div>
            {isHovered && isHoverShowDots ? (
              // TODO: popover position
              <Popover
                closeWhenClicked
                popOverElement={
                  <MoreAction
                    handleDelete={() => setShowConfirmModal(true)}
                    handleEdit={handleStartEdit}
                  />
                }
                containerClass=''
              >
                <MdMoreHoriz className='cursor-pointer' size={18} />
              </Popover>
            ) : null}
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
      {showConfirmModal ? (
        <ConfirmModal
          title='刪除留言？'
          description='確定要刪除這則留言嗎？'
          confirmLabel='刪除'
          closeModal={() => setShowConfirmModal(false)}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteComment}
        />
      ) : null}
    </div>
  )
}

export default Comment
