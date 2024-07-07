import Avatar from '@/components/Avatar'
import { FC } from 'react'

type PostUserInfoProps = {
  name: string
  createAt: string
}

const PostUserInfo: FC<PostUserInfoProps> = ({ name, createAt }) => {
  return (
    <div className='flex'>
      <Avatar className='mr-2' />
      <div>
        <div className='font-bold cursor-pointer hover:underline'>{name}</div>
        <div className='text-gray-500 text-sm'>{createAt}</div>
      </div>
    </div>
  )
}

export default PostUserInfo
