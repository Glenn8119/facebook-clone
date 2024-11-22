import Modal from '@/components/Modal'
import { AnyFunction } from '@/types/common'
import { FC } from 'react'

type EditProfileModalProps = {
  onClose?: AnyFunction
}

const EditProfileModal: FC<EditProfileModalProps> = ({ onClose }) => {
  return (
    <Modal onCloseModal={onClose} modalClassName='w-175'>
      <div className='h-15 p-4 text-center font-medium text-xl border-b'>
        編輯個人檔案
      </div>
      <div className='p-4'>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <span className='mr-auto text-md font-medium'>大頭貼照</span>
            <span className='cursor-pointer text-blue-500'>編輯/新增</span>
          </div>
          <div className='text-center'>頭貼</div>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <span className='mr-auto text-md font-medium'>封面相片</span>
            <span className='cursor-pointer text-blue-500'>編輯/新增</span>
          </div>
          <div className='text-center'>封面相片</div>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <span className='mr-auto text-md font-medium'>個人簡介</span>
            <span className='cursor-pointer text-blue-500'>編輯/新增</span>
          </div>
          <div className='text-center text-slate-400'>介紹一下你自己......</div>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <span className='mr-auto text-md font-medium'>工作地點</span>
            <span className='cursor-pointer text-blue-500'>編輯/新增</span>
          </div>
          <div className='text-center text-slate-400'>你所屬的公司名稱</div>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <span className='mr-auto text-md font-medium'>現居城市</span>
            <span className='cursor-pointer text-blue-500'>編輯/新增</span>
          </div>
          <div className='text-center text-slate-400'>你所居住的地方</div>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <span className='mr-auto text-md font-medium'>家鄉</span>
            <span className='cursor-pointer text-blue-500'>編輯/新增</span>
          </div>
          <div className='text-center text-slate-400'>你的家鄉</div>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
