import Card from '@/components/layout/Card'
import { FC } from 'react'
import fakeAvatar from '@/assets/fake-avatar.jpeg'

interface FriendAreaProps {}

const FriendArea: FC<FriendAreaProps> = () => {
  return (
    <div className='basis-92 pt-4'>
      <Card>
        <div>朋友</div>
        <div className='p-2 flex flex-wrap gap-4 w-92'>
          <div className='basis-24 flex-grow '>
            <img
              className='w-24 h-24 rounded-xl cursor-pointer'
              src={fakeAvatar}
            />
            <div className='cursor-pointer hover:underline'>Name</div>
          </div>
          <div className='basis-24 flex-grow'>
            <img className='w-24 h-24 rounded-xl' src={fakeAvatar} />
            <div>Name</div>
          </div>
          <div className='basis-24 flex-grow'>
            <img className='w-24 h-24 rounded-xl' src={fakeAvatar} />
            <div>Name</div>
          </div>
          <div className='basis-24 flex-grow'>
            <img className='w-24 h-24 rounded-xl' src={fakeAvatar} />
            <div>Name</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default FriendArea
