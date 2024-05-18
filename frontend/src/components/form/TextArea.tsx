import { FC, TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextAreaProps = {
  error?: boolean
  className: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>
const TextArea: FC<TextAreaProps> = ({ className, error, ...props }) => {
  const errorClassName = error ? 'border border-red-500' : ''

  const cn = twMerge(
    'p-2 resize-none w-full text-2xl flex-grow mb-2 rounded focus-visible:outline-none',
    className,
    errorClassName
  )

  return (
    <textarea {...props} className={cn} placeholder='Username，在想些什麼？' />
  )
}

export default TextArea
