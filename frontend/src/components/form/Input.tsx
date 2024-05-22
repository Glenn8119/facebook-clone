import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const className = twMerge(
    'w-full border-gray-300 border rounded-md h-12 p-4 outline-none',
    props.className
  )

  return <input ref={ref} {...props} className={className} />
})

export default Input
