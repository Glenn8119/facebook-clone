import Modal from '@/components/Modal'
import { AnyFunction } from '@/types/common'
import { FC } from 'react'
import EditBlock, { EditBlockType } from '@/components/form/EditBlock'

type EditProfileModalProps = {
  onClose?: AnyFunction
}

const EditProfileModal: FC<EditProfileModalProps> = ({ onClose }) => {
  const save = (value: string) => {
    console.log(value)
  }

  return (
    <Modal onCloseModal={onClose} modalClassName='w-175'>
      <div className='h-15 p-4 text-center font-medium text-xl border-b'>
        編輯個人檔案
      </div>
      <div className='p-4'>
        <EditBlock
          label='大頭貼照'
          hint='頭貼'
          type={EditBlockType.PICTURE}
          className='mb-4'
          handleSave={save}
        />
        <EditBlock
          label='封面相片'
          hint='封面相片'
          type={EditBlockType.PICTURE}
          className='mb-4'
          handleSave={save}
        />
        <EditBlock
          label='個人簡介'
          hint='介紹一下你自己......'
          placeholder='介紹你自己'
          type={EditBlockType.TEXTAREA}
          className='mb-4'
          handleSave={save}
        />
        <EditBlock
          label='工作地點'
          hint='你所屬的公司名稱'
          placeholder='公司名稱'
          type={EditBlockType.INPUT}
          className='mb-4'
          handleSave={save}
        />
        <EditBlock
          label='現居城市'
          hint='你所居住的地方'
          placeholder='城市'
          type={EditBlockType.INPUT}
          className='mb-4'
          handleSave={save}
        />
        <EditBlock
          label='家鄉'
          hint='你的家鄉'
          placeholder='城市'
          type={EditBlockType.INPUT}
          className='mb-4'
          handleSave={save}
        />
      </div>
    </Modal>
  )
}

export default EditProfileModal
