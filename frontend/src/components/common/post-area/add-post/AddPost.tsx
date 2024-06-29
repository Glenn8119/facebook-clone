import Avatar from '@/components/Avatar'
import { useState } from 'react'
import AddPostModal from '@/components/common/post-area/add-post/AddPostModal'
import Card from '@/components/layout/Card'
import useUserContext from '@/hooks/useUserContext'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/common'

const AddPost = () => {
  const {
    value: { name, id }
  } = useUserContext()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const handleClick = () => {
    navigate({
      pathname: ROUTES.PERSONAL,
      search: createSearchParams({ id }).toString()
    })
  }

  return (
    <>
      <Card className='flex items-center h-14 mb-3'>
        <Avatar className='mr-2 cursor-pointer' onClick={handleClick} />
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
