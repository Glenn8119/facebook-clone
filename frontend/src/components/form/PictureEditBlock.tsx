import { FC, useState } from 'react'
import ImageUploader from '@/components/image-uploader/ImageUploader'

type PictureEditBlockProps = {
  label: string
  hint: string
  aspect: number
  name: 'avatarImage' | 'coverImage'
  value: string
  className: string
  imageClassName: string
  imageHeight: number
  handleChange: (name: string, imageUrl: string) => void
  handleSave: (key: string, value: string) => void
}

const getImageStyle = (name: 'avatarImage' | 'coverImage', aspect: number) => {
  if (name === 'avatarImage') {
    return {
      width: '168px',
      height: '168px',
      borderRadius: '9999px'
    }
  } else {
    return {
      width: `${aspect * 196}px`,
      height: '196px',
      borderRadius: '12px'
    }
  }
}

const PictureEditBlock: FC<PictureEditBlockProps> = ({
  label,
  hint,
  value,
  aspect,
  name,
  className,
  imageClassName,
  handleChange,
  handleSave
}) => {
  const [imageUrl, setImageUrl] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const imageStyleConfig = getImageStyle(name, aspect)

  const handleCropComplete = (imageUrl: string) => {
    setImageUrl(imageUrl)
  }

  const handleConfirm = () => {
    handleChange(name, imageUrl)
    handleSave(name, imageUrl)
    setIsEditing(false)
  }

  return (
    <>
      <div className={className}>
        <div className='flex mb-2'>
          <span className='mr-auto text-lg font-bold'>{label}</span>
          <span
            className='cursor-pointer text-blue-500'
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '取消' : value ? '編輯' : '新增'}
          </span>
        </div>
        <div className='flex justify-center h-49'>
          {value ? (
            <img
              src={value}
              className={imageClassName}
              style={imageStyleConfig}
            />
          ) : (
            <div className='bg-slate-100' style={imageStyleConfig} />
          )}
        </div>
        {isEditing ? (
          <ImageUploader
            aspect={aspect}
            title={hint}
            handleCropComplete={handleCropComplete}
            handleClose={() => setIsEditing(false)}
            handleConfirm={handleConfirm}
          />
        ) : null}
      </div>
    </>
  )
}

export default PictureEditBlock
