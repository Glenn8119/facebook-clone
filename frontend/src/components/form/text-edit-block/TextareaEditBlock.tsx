import Button from '@/components/form/Button'
import TextArea from '@/components/form/TextArea'
import { AnyFunction } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { FC, useState } from 'react'

type TextareaEditBlockProps = {
  value: string
  name: string
  placeholder: string
  handleCancel: AnyFunction
  handleSave: AnyFunction
  handleChange: (name: string, value: string) => void
}

const TextareaEditBlock: FC<TextareaEditBlockProps> = ({
  value,
  name,
  placeholder,
  handleCancel,
  handleSave,
  handleChange
}) => {
  const [initialValue, _] = useState(value)

  const onCancel = () => {
    handleChange(name, initialValue)
    handleCancel()
  }
  return (
    <div>
      <TextArea
        name={name}
        placeholder={placeholder}
        maxLength={50}
        className='text-sm border'
        value={value}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <div className='flex'>
        <Button
          variant={ButtonVariant.AUXILIARY}
          className='mr-2 w-12'
          size={ButtonSize.SMALL}
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          disabled={!value}
          className='w-12'
          size={ButtonSize.SMALL}
          onClick={handleSave}
        >
          儲存
        </Button>
      </div>
    </div>
  )
}

export default TextareaEditBlock
