import Avatar from '@/components/Avatar'
import { FC, useState } from 'react'
import AddPostModal from '@/pages/home-page/post-area/add-post/AddPostModal'

interface AddPostProps {}

const AddPost: FC<AddPostProps> = () => {
  const userName = 'User Name'
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='flex items-center h-14 py-2 px-4 rounded-lg bg-white'>
        <Avatar className='mr-2' />
        <div
          className='flex items-center flex-grow cursor-pointer p-4 h-full rounded-full bg-slate-100 text-slate-500'
          onClick={() => setShowModal(true)}
        >
          {userName}，在想些什麼？
        </div>
      </div>
      {showModal ? (
        <AddPostModal closeModal={() => setShowModal(false)} />
      ) : null}
    </>
  )
}

export default AddPost
