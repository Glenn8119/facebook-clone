import { ChangeEvent, FC, useState } from 'react'
import Cropper, { type Point, type Area } from 'react-easy-crop'
import getCroppedImg from '@/components/image-uploader/helper'
import Modal from '@/components/Modal.tsx'
import { AnyFunction } from '@/types/common'
import Button from '@/components/form/Button'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { MdOutlinePublic } from 'react-icons/md'

interface ImageUploaderProps {
  title: string
  aspect: number
  handleClose: AnyFunction
  handleCropComplete: (imageUrl: string) => void
  handleConfirm: AnyFunction
}

const ImageUploader: FC<ImageUploaderProps> = ({
  aspect = 2.7,
  title,
  handleClose,
  handleCropComplete,
  handleConfirm
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [currentImage, setCurrentImage] = useState<string>()
  const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
    const croppedImage = await getCroppedImg(currentImage!, croppedAreaPixels!)
    handleCropComplete(croppedImage!)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.currentTarget.files

    if (fileList) {
      const file = fileList[0]
      const reader = new FileReader()

      reader.onload = function (e: ProgressEvent<FileReader>) {
        const base64String = e.target!.result as string
        setCurrentImage(base64String)
      }

      // 開始讀取檔案，並將檔案轉換為 Base64
      reader.readAsDataURL(file)
    }
  }

  return (
    <Modal
      onCloseModal={handleClose}
      modalClassName='flex flex-col w-135 h-135'
    >
      <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
        {title}
      </div>
      <div className='relative my-auto flex-grow p-2'>
        {currentImage ? (
          <Cropper
            image={currentImage}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <label
            className='flex justify-center items-center h-full w-full cursor-pointer border border-dashed border-slate-400 rounded-lg'
            htmlFor='file-uploader'
          >
            選擇相片
          </label>
        )}
      </div>
      <div className='flex justify-center items-center p-2 text-slate-500'>
        <MdOutlinePublic className='mr-2' size={20} />
        <span className='mr-auto'>你的相片會公開顯示。</span>
        <div className='flex items-center px-4 py-1 hover:bg-slate-200 rounded-md cursor-pointer'>
          <input
            id='file-uploader'
            type='file'
            className='hidden'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='flex justify-end p-4 border-t'>
        <Button
          size={ButtonSize.SMALL}
          className='w-28 mr-2 text-nowrap px-2'
          variant={ButtonVariant.AUXILIARY}
          onClick={handleClose}
        >
          取消
        </Button>
        <Button
          size={ButtonSize.SMALL}
          className='w-28'
          onClick={() => handleConfirm()}
        >
          確認
        </Button>
      </div>
    </Modal>
  )
}

export default ImageUploader
