import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import { SetStateType } from '@/types/common'
import { KeyboardEvent, forwardRef } from 'react'

type CommentActionProps = {
  inputValue: string
  setInputValue: SetStateType<string>
  handleEnterKey: () => void
}

const CommentAction = forwardRef<HTMLInputElement, CommentActionProps>(
  ({ inputValue, setInputValue, handleEnterKey }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleEnterKey()
      }
    }

    return (
      <div className='flex items-center'>
        <Avatar className='mr-2' />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={ref}
          className='h-8 border-none rounded-full bg-main'
          placeholder='留言......'
        />
      </div>
    )
  }
)

export default CommentAction
