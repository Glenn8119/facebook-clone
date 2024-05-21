import Avatar from '@/components/Avatar'

const PostUserInfo = () => {
  return (
    <div className='flex'>
      <Avatar className='mr-2' />
      <div>
        <div className='font-bold cursor-pointer hover:underline'>孫悟空</div>
        <div className='text-gray-500 text-sm'>22小時</div>
      </div>
    </div>
  )
}

export default PostUserInfo
