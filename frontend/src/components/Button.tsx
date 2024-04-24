import { ButtonVariant } from '@/types/component/input'
import { ButtonHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const Button: FC<InputProps> = ({
  variant = ButtonVariant.PRIMARY,
  ...props
}) => {
  const bgClass =
    variant === ButtonVariant.PRIMARY ? 'bg-blue-600' : 'bg-green-600'

  const className = twMerge(
    'w-full rounded-md h-12 text-white',
    bgClass,
    props.className
  )

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  )
}

export default Button
