import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { ButtonHTMLAttributes, FC } from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  IconElement?: IconType
  size?: ButtonSize
  variant?: ButtonVariant
}

const Button: FC<ButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.NORMAL,
  IconElement,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return 'bg-blue-600'
      case ButtonVariant.SECONDARY:
        return 'bg-green-600'
      case ButtonVariant.AUXILIARY:
        return 'bg-slate-200 text-black'
    }
  }

  const variantClass = getVariantClass()
  const sizeClass = size === ButtonSize.NORMAL ? 'h-12' : 'h-9'

  const className = twMerge(
    'flex justify-center items-center w-full font-semibold rounded-md text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
    variantClass,
    sizeClass,
    props.className
  )

  return (
    <button {...props} className={className}>
      {IconElement ? (
        <span className='mr-1 font w-6 h-6'>
          <IconElement className='w-full h-full' />
        </span>
      ) : null}
      <span>{props.children}</span>
    </button>
  )
}

export default Button
