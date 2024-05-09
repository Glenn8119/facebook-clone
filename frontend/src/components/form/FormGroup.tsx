import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type FormGroupProps = {
  children: ReactNode
  className?: string
}

const FormGroup: FC<FormGroupProps> = ({ children, className }) => {
  const mergedClassName = twMerge('flex flex-col w-full', className)

  return <div className={mergedClassName}>{children}</div>
}

export default FormGroup
