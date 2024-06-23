import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import Card from '@/components/layout/Card'
import useGetFriendList from '@/hooks/api/useGetFriendList'
import { useSearchParams } from 'react-router-dom'

const PersonalFriends = () => {
  const [searchParams] = useSearchParams()
  const { friendList } = useGetFriendList(searchParams.get('id') as string)

  if (!friendList) return null

  const friendBoxList = friendList.map((friend) => (
    <div
      key={friend.id}
      className='flex items-center h-28 p-4 border border-main rounded-lg'
    >
      <Avatar className='mr-4 rounded w-20' />
      <div className='flex flex-col justify-center'>
        <div>{friend.name}</div>
        <div className='text-sm text-slate-400'>
          {friend.commonFriendList.length} 位共同朋友
        </div>
      </div>
    </div>
  ))

  return (
    <Card className='p-4'>
      <div className='mb-4 flex'>
        <div className='font-semi-bold text-xl mr-auto'>朋友</div>
        <Input
          className='w-52 h-9 rounded-full bg-gray-100 border-none'
          placeholder='搜尋'
        />
      </div>
      <div className='grid grid-cols-2 gap-1'>{friendBoxList}</div>
    </Card>
  )
}

export default PersonalFriends
