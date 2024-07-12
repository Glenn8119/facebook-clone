import { FC, ReactNode, useState } from 'react'
import Mask from '@/components/Mask'
import { MdClose } from 'react-icons/md'
import { AnyFunction } from '@/types/common'
import { twMerge } from 'tailwind-merge'

type ModalProps = {
  children: ReactNode
  onCloseModal?: AnyFunction
  modalClassName?: string
}

const Modal: FC<ModalProps> = ({ children, onCloseModal, modalClassName }) => {
  const [showModal, setShowModal] = useState(true)
  const handleCloseModal = async () => {
    onCloseModal && (await onCloseModal())
    setShowModal(false)
  }
  const cn = twMerge(
    'relative w-125 bg-white rounded shadow-lg',
    modalClassName
  )

  return (
    <>
      {showModal ? (
        <Mask handleMaskClick={handleCloseModal}>
          <div className={cn} onClick={(e) => e.stopPropagation()}>
            {children}
            <MdClose
              size={24}
              className='absolute top-4 right-4 cursor-pointer'
              onClick={handleCloseModal}
            />
          </div>
        </Mask>
      ) : null}
    </>
  )
}

export default Modal
