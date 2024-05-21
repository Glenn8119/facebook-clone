import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import { FC } from 'react'

interface CommentActionProps {}

const CommentAction: FC<CommentActionProps> = () => {
  return (
    <div className='flex items-center'>
      <Avatar className='mr-2' />
      <Input
        className='h-8 border-none rounded-full bg-main'
        placeholder='留言......'
      />
    </div>
  )
}

export default CommentAction
