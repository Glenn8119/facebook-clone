import Avatar from '@/components/Avatar'
import { FC } from 'react'

interface AddPostProps {}

const AddPost: FC<AddPostProps> = () => {
  const userName = 'User Name'

  return (
    <div className='flex items-center h-14 py-2 px-4 rounded-lg bg-white'>
      <Avatar className='mr-2' />
      <div className='flex items-center flex-grow p-4 h-full rounded-full bg-slate-100 text-slate-500'>
        {userName}，在想些什麼？
      </div>
    </div>
  )
}

export default AddPost
