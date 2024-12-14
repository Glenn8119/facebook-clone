import { FC, useState } from 'react'
import ImageUploader from '@/components/image-uploader/ImageUploader'
import { AnyFunction } from '@/types/common'

type PictureEditBlockProps = {
  aspect: number
  name: string
  value: string
  title: string
  handleChange: (name: string, imageUrl: string) => void
  handleCancel: AnyFunction
  handleSave: AnyFunction
}

const PictureEditBlock: FC<PictureEditBlockProps> = ({
  aspect,
  name,
  title,
  handleChange,
  handleCancel,
  handleSave
}) => {
  const [imageUrl, setImageUrl] = useState('')

  const handleCropComplete = (imageUrl: string) => {
    setImageUrl(imageUrl)
  }

  const handleConfirm = async () => {
    handleChange(name, imageUrl)
    await handleSave()
  }

  return (
    <>
      <ImageUploader
        aspect={aspect}
        title={title}
        handleCropComplete={handleCropComplete}
        handleClose={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default PictureEditBlock
