import { FC } from 'react'

import { AnyFunction } from '@/types/common'

import Modal from '@/components/Modal'
import Button from '@/components/form/Button'
import { ButtonSize, ButtonVariant } from '@/types/component/button'

type ConfirmModalProps = {
  title: string
  description: string
  confirmLabel: string
  closeModal: AnyFunction
  onCancel: AnyFunction
  onConfirm: AnyFunction
  cancelLabel?: string
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  description,
  confirmLabel,
  closeModal,
  onCancel,
  onConfirm,
  cancelLabel = '否'
}) => {
  return (
    <Modal onCloseModal={closeModal}>
      <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
        {title}
      </div>
      <div className='p-4'>
        <div className='mb-8'>{description}</div>
        <div className='flex justify-end'>
          <Button
            size={ButtonSize.SMALL}
            className='w-28 mr-2 text-nowrap px-2'
            variant={ButtonVariant.AUXILIARY}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button size={ButtonSize.SMALL} className='w-28' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
