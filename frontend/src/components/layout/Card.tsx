import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = InputHTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}
export type ForwardedInputRefType = HTMLDivElement

const Card = forwardRef<ForwardedInputRefType, CardProps>(
  ({ children, ...props }, ref) => {
    const cn = twMerge(
      'p-2 px-4 rounded-lg bg-white shadow-lg',
      props.className
    )

    return (
      <div {...props} className={cn} ref={ref}>
        {children}
      </div>
    )
  }
)
export default Card
