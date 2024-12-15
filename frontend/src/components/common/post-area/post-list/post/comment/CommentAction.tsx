import Avatar from '@/components/Avatar'
import Input, { ForwardedInputRefType } from '@/components/form/Input'
import useUserContext from '@/hooks/useUserContext'
import { SetStateType } from '@/types/common'
import scrollCenterElement from '@/utils/scrollCenterElement'
import { KeyboardEvent, forwardRef, useImperativeHandle, useRef } from 'react'

type CommentActionProps = {
  inputValue: string
  setInputValue: SetStateType<string>
  handleEnterKey: () => void
}
export type CommentActionForwardedRefType = {
  scrollAndFocusInput: () => void
}

const CommentAction = forwardRef<
  { scrollAndFocusInput: () => void },
  CommentActionProps
>(({ inputValue, setInputValue, handleEnterKey }, ref) => {
  const {
    value: { avatarImage }
  } = useUserContext()

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEnterKey()
    }
  }

  const inputRef = useRef<ForwardedInputRefType>(null)

  useImperativeHandle(ref, () => ({
    scrollAndFocusInput() {
      if (!inputRef.current) return

      const input = inputRef.current.getNode()
      if (!input) return

      scrollCenterElement(input)
      setTimeout(() => {
        input.focus()
      }, 500)
    }
  }))

  return (
    <div className='flex items-center'>
      <Avatar className='mr-2' imgUrl={avatarImage} />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className='h-8 border-none rounded-full bg-main'
        placeholder='留言......'
      />
    </div>
  )
})

export default CommentAction
