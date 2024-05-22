import Card from '@/components/layout/Card'
import { FC, useRef } from 'react'

import PostUserInfo from './PostUserInfo'
import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdOutlineModeComment
} from 'react-icons/md'
import Comment from './Comment'
import CommentAction from './CommentAction'

type PostProps = {
  className: string
}

const Post: FC<PostProps> = ({ className }) => {
  const commentInputRef = useRef<HTMLInputElement>(null)

  const commentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus()
    }
  }

  return (
    <Card className={className}>
      <PostUserInfo />
      <div className='py-4'>Content</div>
      <div className='flex items-center mb-3'>
        <div className='w-5 h-5 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-1'>
          <MdThumbUp color='white' size={12} />
        </div>
        <span className='mr-auto text-15 text-gray-400 hover:underline cursor-pointer'>
          影山飛雄和其他38人
        </span>
        <span className='cursor-pointer hover:underline text-gray-400'>
          2則留言
        </span>
      </div>
      <div className='flex py-1 mb-2 border-t border-b text-gray-500 text-15'>
        <div className='flex items-center justify-center flex-grow py-1 cursor-pointer hover:bg-main'>
          <MdOutlineThumbUp size='20' className='mr-2' />
          <span>讚</span>
        </div>
        <div
          className='flex items-center justify-center flex-grow py-1 cursor-pointer hover:bg-main'
          onClick={commentClick}
        >
          <MdOutlineModeComment size='20' className='mr-2' />
          <span>留言</span>
        </div>
      </div>
      <Comment className='mb-2' />
      <CommentAction ref={commentInputRef} />
    </Card>
  )
}

export default Post
