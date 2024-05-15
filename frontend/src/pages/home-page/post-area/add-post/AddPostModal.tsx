import Avatar from '@/components/Avatar'
import Mask from '@/components/Mask'
import Button from '@/components/form/Button'
import { ButtonSize } from '@/types/component/input'
import { FC } from 'react'

interface AddPostModalProps {
  closeModal: () => void
}

const AddPostModal: FC<AddPostModalProps> = ({ closeModal }) => {
  return (
    <Mask>
      <div className='relative w-125 h-107 bg-white rounded shadow-lg'>
        <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
          建立貼文
        </div>
        <div className='flex flex-col p-4 h-92'>
          <div className='flex mb-2'>
            <Avatar className='mr-2' />
            <span>Username </span>
          </div>
          <textarea
            className='resize-none w-full text-2xl flex-grow mb-2 focus-visible:outline-none'
            placeholder='Username，在想些什麼？'
          />
          <Button size={ButtonSize.SMALL}>發布</Button>
        </div>
        {/* TODO: close icon */}
        <div
          className='absolute top-4 right-4 cursor-pointer'
          onClick={closeModal}
        >
          X
        </div>
      </div>
    </Mask>
  )
}

export default AddPostModal
