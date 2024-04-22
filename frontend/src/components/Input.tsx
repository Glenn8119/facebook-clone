import { FC, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputProps> = (props) => {
  const className = twMerge(
    'w-full border-gray-300 border rounded-md h-6 p-4',
    props.className
  )

  return <input {...props} className={className} />
}

export default Input
