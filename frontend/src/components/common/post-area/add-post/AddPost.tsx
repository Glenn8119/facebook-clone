import Avatar from '@/components/Avatar'
import { useState } from 'react'
import AddPostModal from '@/components/common/post-area/add-post/AddPostModal'
import Card from '@/components/layout/Card'
import useUserContext from '@/hooks/useUserContext'
import { ROUTES } from '@/constants/common'
import useNavigateTo from '@/hooks/useNavigateTo'

const AddPost = () => {
  const {
    value: { name, id, avatarImage }
  } = useUserContext()
  const navigate = useNavigateTo()
  const [showModal, setShowModal] = useState(false)
  const handleClick = () => {
    navigate({
      pathname: ROUTES.PROFILE,
      queries: { id }
    })
  }

  return (
    <>
      <Card className='flex items-center h-14 mb-3'>
        <Avatar
          className='mr-2 cursor-pointer'
          imgUrl={avatarImage}
          onClick={handleClick}
        />
        <div
          className='flex items-center flex-grow cursor-pointer p-4 h-full rounded-full bg-slate-100 text-slate-500'
          onClick={() => setShowModal(true)}
        >
          {name}，在想些什麼？
        </div>
      </Card>
      {showModal ? (
        <AddPostModal closeModal={() => setShowModal(false)} />
      ) : null}
    </>
  )
}

export default AddPost
