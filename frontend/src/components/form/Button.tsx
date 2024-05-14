import { ButtonSize, ButtonVariant } from '@/types/component/input'
import { ButtonHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
}

const Button: FC<ButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize,
  ...props
}) => {
  const bgClass =
    variant === ButtonVariant.PRIMARY ? 'bg-blue-600' : 'bg-green-600'
  const sizeClass = size === ButtonSize.NORMAL ? 'h-12' : 'h-9'

  const className = twMerge(
    'w-full rounded-md text-white',
    bgClass,
    sizeClass,
    props.className
  )

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  )
}

export default Button
