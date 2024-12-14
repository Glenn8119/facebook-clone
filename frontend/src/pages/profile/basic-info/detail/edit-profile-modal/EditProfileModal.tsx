import Modal from '@/components/Modal'
import { AnyFunction } from '@/types/common'
import { FC, useState } from 'react'
import TextEditBlock, {
  TextEditBlockType
} from '@/components/form/text-edit-block/TextEditBlock'
import { useSearchParams } from 'react-router-dom'
import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'
import useUpdateUserDetail from '@/hooks/api/mutation/useUpdateUserDetail'
import PictureEditBlock from '@/components/form/PictureEditBlock'

type EditProfileModalProps = {
  onClose?: AnyFunction
}

const EditProfileModal: FC<EditProfileModalProps> = ({ onClose }) => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const { userDetail } = useGetUserDetail(userId)
  const { bio, company, hometown, avatarImage, coverImage, currentResidence } =
    userDetail!
  const [formData, setFormData] = useState({
    bio: bio ?? '',
    company: company ?? '',
    hometown: hometown ?? '',
    avatarImage: avatarImage ?? '',
    coverImage: coverImage ?? '',
    currentResidence: currentResidence ?? ''
  })
  const { mutateAsync: updateUserDetail } = useUpdateUserDetail()

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const handleSave = async () => {
    const {
      currentResidence,
      company,
      hometown,
      bio,
      coverImage,
      avatarImage
    } = formData
    await updateUserDetail({
      bio,
      cover_image: coverImage,
      avatar_image: avatarImage,
      hometown,
      company,
      current_residence: currentResidence
    })
  }

  const handleImageSave = async (key: string, value: string) => {
    const clonedFormData = { ...formData }
    clonedFormData[key as 'avatarImage' | 'coverImage'] = value
    const {
      currentResidence,
      company,
      hometown,
      bio,
      coverImage,
      avatarImage
    } = clonedFormData
    await updateUserDetail({
      bio,
      cover_image: coverImage,
      avatar_image: avatarImage,
      hometown,
      company,
      current_residence: currentResidence
    })
  }

  const handleCancel = () => {
    setFormData({
      bio: bio ?? '',
      company: company ?? '',
      hometown: hometown ?? '',
      avatarImage: avatarImage ?? '',
      coverImage: coverImage ?? '',
      currentResidence: currentResidence ?? ''
    })
  }

  return (
    <Modal onCloseModal={onClose} modalClassName='w-175 h-125 flex flex-col'>
      <div className='h-15 p-4 text-center font-medium text-xl border-b'>
        編輯個人檔案
      </div>
      <div className='p-4 h-full overflow-auto'>
        <PictureEditBlock
          aspect={1}
          value={formData.avatarImage}
          name='avatarImage'
          label='大頭貼照'
          hint='頭貼'
          className='mb-4'
          imageHeight={168}
          imageClassName='h-42'
          handleSave={handleImageSave}
          handleChange={handleChange}
        />
        <PictureEditBlock
          aspect={2.7}
          value={formData.coverImage}
          name='coverImage'
          label='封面相片'
          hint='封面相片'
          className='mb-4'
          imageHeight={185}
          imageClassName='h-46'
          handleSave={handleImageSave}
          handleChange={handleChange}
        />
        <TextEditBlock
          value={formData.bio}
          name='bio'
          label='個人簡介'
          hint='介紹一下你自己...'
          placeholder='介紹你自己'
          type={TextEditBlockType.TEXTAREA}
          className='mb-4'
          handleSave={handleSave}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
        <TextEditBlock
          value={formData.company}
          name='company'
          label='工作地點'
          hint='你所屬的公司名稱'
          placeholder='公司名稱'
          type={TextEditBlockType.INPUT}
          className='mb-4'
          handleSave={handleSave}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
        <TextEditBlock
          value={formData.currentResidence}
          name='currentResidence'
          label='現居城市'
          hint='你所居住的地方'
          placeholder='城市'
          type={TextEditBlockType.INPUT}
          className='mb-4'
          handleSave={handleSave}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
        <TextEditBlock
          value={formData.hometown}
          name='hometown'
          label='家鄉'
          hint='你的家鄉'
          placeholder='城市'
          type={TextEditBlockType.INPUT}
          className='mb-4'
          handleSave={handleSave}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      </div>
    </Modal>
  )
}

export default EditProfileModal
