import Button from '@/components/form/Button'
import TextArea from '@/components/form/TextArea'
import { AnyFunction } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { FC, useState } from 'react'

type TextareaEditBlockProps = {
  placeholder: string
  handleCancel: AnyFunction
  handleSave: AnyFunction
  initialValue?: string
}

const TextareaEditBlock: FC<TextareaEditBlockProps> = ({
  placeholder,
  handleCancel,
  handleSave,
  initialValue
}) => {
  const [inputValue, setInputValue] = useState(initialValue)

  const onCancel = () => {
    setInputValue(initialValue ?? '')
    handleCancel()
  }

  const onSave = async () => {
    await handleSave(inputValue)
  }
  return (
    <div>
      <TextArea
        placeholder={placeholder}
        maxLength={50}
        className='text-sm border'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
          disabled={!inputValue}
          className='w-12'
          size={ButtonSize.SMALL}
          onClick={onSave}
        >
          儲存
        </Button>
      </div>
    </div>
  )
}

export default TextareaEditBlock
