import { FC, useState } from 'react'
import { AnyFunction } from '@/types/common'
import InputEditBlock from '@/components/form/InputEditBlock'
import TextareaEditBlock from '@/components/form/TextareaEditBlock'

const PictureEditBlock = () => {
  return ''
}

export enum EditBlockType {
  PICTURE = 'Picture',
  INPUT = 'Input',
  TEXTAREA = 'Textarea'
}

type EditBlockProps = {
  label: string
  hint: string
  type: EditBlockType
  placeholder?: string
  className?: string
  content?: string
  handleSave: AnyFunction
}

const EditBlock: FC<EditBlockProps> = ({
  label,
  hint,
  placeholder,
  type,
  className,
  content,
  handleSave
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const onSave = async (value: string) => {
    await handleSave(value)
    setIsEditing(false)
  }

  const renderEditBlock = () => {
    switch (type) {
      case EditBlockType.INPUT:
        return (
          <InputEditBlock
            placeholder={placeholder ?? ''}
            initialValue={content}
            handleCancel={() => setIsEditing(false)}
            handleSave={onSave}
          />
        )
      case EditBlockType.TEXTAREA:
        return (
          <TextareaEditBlock
            placeholder={placeholder ?? ''}
            initialValue={content}
            handleCancel={() => setIsEditing(false)}
            handleSave={onSave}
          />
        )
      case EditBlockType.PICTURE:
        return <PictureEditBlock />
    }
  }

  return (
    <div className={className}>
      <div className='flex mb-2'>
        <span className='mr-auto text-md font-medium'>{label}</span>
        <span
          className='cursor-pointer text-blue-500'
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? '取消' : content ? '編輯' : '新增'}
        </span>
      </div>
      {isEditing ? (
        renderEditBlock()
      ) : (
        <div className='text-center text-slate-400'>{hint}</div>
      )}
    </div>
  )
}

export default EditBlock
