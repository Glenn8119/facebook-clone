import Avatar from '@/components/Avatar'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type CommentProps = {
  content: string
  name: string
  createAt: string
  className?: string
}

const Comment: FC<CommentProps> = ({ className, content, name, createAt }) => {
  const cn = twMerge('flex items-start', className)
  return (
    <div className={cn}>
      <Avatar className='mr-2' />
      <div>
        <div className='bg-main rounded-2xl py-2 px-3 text-15'>
          <div className='cursor-pointer font-bold hover:underline'>{name}</div>
          <div>{content}</div>
        </div>
        <div className='pl-3 text-13 text-gray-500'>
          <span className='font-light  mr-3'>{createAt}</span>
          {/* <span className='cursor-pointer hover:underline mr-3'>讚</span>
          <span className='cursor-pointer hover:underline mr-3'>回覆</span> */}
        </div>
      </div>
    </div>
  )
}

export default Comment
