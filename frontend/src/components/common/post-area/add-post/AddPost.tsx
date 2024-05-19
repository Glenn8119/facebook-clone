import Avatar from '@/components/Avatar'
import { FC, useState } from 'react'
import AddPostModal from '@/components/common/post-area/add-post/AddPostModal'
import Card from '@/components/layout/Card'

interface AddPostProps {}

const AddPost: FC<AddPostProps> = () => {
  const userName = 'User Name'
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Card className='h-14'>
        <Avatar className='mr-2' />
        <div
          className='flex items-center flex-grow cursor-pointer p-4 h-full rounded-full bg-slate-100 text-slate-500'
          onClick={() => setShowModal(true)}
        >
          {userName}，在想些什麼？
        </div>
      </Card>
      {showModal ? (
        <AddPostModal closeModal={() => setShowModal(false)} />
      ) : null}
    </>
  )
}

export default AddPost
