import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import { AnyFunction } from '@/types/common'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { FC, useState } from 'react'

type InputEditBlockProps = {
  placeholder: string
  handleCancel: AnyFunction
  handleSave: AnyFunction
  value: string
  name: string
  handleChange: (name: string, value: string) => void
}

const InputEditBlock: FC<InputEditBlockProps> = ({
  placeholder,
  handleCancel,
  handleSave,
  name,
  value,
  handleChange
}) => {
  const [initialValue, _] = useState(value)

  const onCancel = () => {
    handleChange(name, initialValue)
    handleCancel()
  }

  return (
    <div>
      <Input
        name={name}
        placeholder={placeholder}
        maxLength={50}
        className='mb-2'
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
          onClick={() => handleSave()}
        >
          儲存
        </Button>
      </div>
    </div>
  )
}

export default InputEditBlock
