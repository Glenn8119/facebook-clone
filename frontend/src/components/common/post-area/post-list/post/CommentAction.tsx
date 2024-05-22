import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import { forwardRef } from 'react'

interface CommentActionProps {}

const CommentAction = forwardRef<HTMLInputElement, CommentActionProps>(
  (_, ref) => {
    return (
      <div className='flex items-center'>
        <Avatar className='mr-2' />
        <Input
          ref={ref}
          className='h-8 border-none rounded-full bg-main'
          placeholder='留言......'
        />
      </div>
    )
  }
)

export default CommentAction
