import { Nullable } from '@/types/common'
import {
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export type ForwardedInputRefType = {
  focus: () => void
  getNode: () => Nullable<HTMLInputElement>
}

const Input = forwardRef<ForwardedInputRefType, InputProps>((props, ref) => {
  const className = twMerge(
    'w-full border-gray-300 border rounded-md h-12 p-4 outline-none',
    props.className
  )

  const inputRef = useRef<Nullable<HTMLInputElement>>(null)
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current && inputRef.current.focus()
    },
    getNode() {
      return inputRef.current
    }
  }))

  return (
    <input
      {...props}
      ref={(node) => (inputRef.current = node)}
      className={className}
    />
  )
})

export default Input
