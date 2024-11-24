import { Nullable } from '@/types/common'
import { FC, TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextAreaProps = {
  isFocusOnCallbackRef?: boolean
  error?: boolean
} & TextareaHTMLAttributes<HTMLTextAreaElement>
const TextArea: FC<TextAreaProps> = ({
  className,
  error,
  isFocusOnCallbackRef,
  ...props
}) => {
  const errorClassName = error ? 'border border-red-500' : ''

  const cn = twMerge(
    'p-2 resize-none w-full text-2xl flex-grow rounded focus-visible:outline-none',
    className,
    errorClassName
  )

  const setRef = (node: Nullable<HTMLTextAreaElement>) => {
    isFocusOnCallbackRef && node && node.focus()
  }

  return <textarea {...props} ref={setRef} className={cn} />
}

export default TextArea
