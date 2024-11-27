import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import { AnyFunction } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { FC, useState } from 'react'

type InputEditBlockProps = {
  placeholder: string
  handleCancel: AnyFunction
  handleSave: AnyFunction
  initialValue?: string
}

const InputEditBlock: FC<InputEditBlockProps> = ({
  placeholder,
  handleCancel,
  handleSave,
  initialValue
}) => {
  const [inputValue, setInputValue] = useState('')

  const onCancel = () => {
    setInputValue(initialValue ?? '')
    handleCancel()
  }

  const onSave = async () => {
    await handleSave(inputValue)
  }
  return (
    <div>
      <Input
        placeholder={placeholder}
        maxLength={50}
        className='mb-2'
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

export default InputEditBlock
