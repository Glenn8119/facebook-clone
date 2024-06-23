import Card from '@/components/layout/Card'
import { FC } from 'react'
import fakeAvatar from '@/assets/fake-avatar.jpeg'
import useGetFriendList from '@/hooks/api/useGetFriendList'
import { useSearchParams } from 'react-router-dom'

interface FriendAreaProps {}

const FriendArea: FC<FriendAreaProps> = () => {
  const [searchParams] = useSearchParams()
  const { friendList } = useGetFriendList(searchParams.get('id') as string)

  if (!friendList) return null

  const friendBoxList = friendList.map((friend) => (
    <div className='flex flex-col px-2' key={friend.id}>
      <img className='w-24 h-24 rounded-xl cursor-pointer' src={fakeAvatar} />
      <div className='cursor-pointer hover:underline'>{friend.name}</div>
    </div>
  ))

  return (
    <div className='basis-92'>
      <Card>
        <div className='text-xl font-bold'>朋友</div>
        <div className='text-slate-600'>{friendList.length} 位朋友</div>
        <div className='p-2 grid grid-cols-3 gap-4 w-92'>{friendBoxList}</div>
      </Card>
    </div>
  )
}

export default FriendArea
