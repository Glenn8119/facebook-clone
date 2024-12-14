import { FC, useState } from 'react'
import { AnyFunction } from '@/types/common'
import InputEditBlock from '@/components/form/text-edit-block/InputEditBlock'
import TextareaEditBlock from '@/components/form/text-edit-block/TextareaEditBlock'

export enum TextEditBlockType {
  INPUT = 'Input',
  TEXTAREA = 'Textarea'
}

type EditBlockProps = {
  label: string
  hint: string
  name: string
  type: TextEditBlockType
  placeholder: string
  className?: string
  value: string
  handleSave?: AnyFunction
  handleCancel: AnyFunction
  handleChange: (name: string, value: string) => void
}

const EditBlock: FC<EditBlockProps> = ({
  label,
  hint,
  name,
  placeholder,
  type,
  className,
  value,
  handleChange,
  handleSave,
  handleCancel
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const onSave = async () => {
    handleSave && (await handleSave())
    setIsEditing(false)
  }

  const onCancel = () => {
    handleCancel()
    setIsEditing(false)
  }

  const renderEditBlock = () => {
    switch (type) {
      case TextEditBlockType.INPUT:
        return (
          <InputEditBlock
            name={name}
            placeholder={placeholder ?? ''}
            value={value ?? ''}
            handleCancel={onCancel}
            handleSave={onSave}
            handleChange={handleChange}
          />
        )
      case TextEditBlockType.TEXTAREA:
        return (
          <TextareaEditBlock
            name={name}
            placeholder={placeholder ?? ''}
            value={value ?? ''}
            handleCancel={() => setIsEditing(false)}
            handleSave={onSave}
            handleChange={handleChange}
          />
        )
    }
  }

  const renderContent = () => {
    const renderByType = () => {
      switch (type) {
        case TextEditBlockType.INPUT:
          return <div>{value}</div>
        case TextEditBlockType.TEXTAREA:
          return <div className='whitespace-pre-wrap'>{value}</div>
      }
    }

    if (value) {
      return renderByType()
    } else {
      return <div className='text-center text-slate-400'>{hint}</div>
    }
  }

  return (
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
      {isEditing ? renderEditBlock() : renderContent()}
    </div>
  )
}

export default EditBlock
