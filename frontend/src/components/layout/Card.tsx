import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = {
  children: ReactNode
  className: string
}

const Card: FC<CardProps> = ({ children, className }) => {
  const cn = twMerge(
    'flex items-center p-2 px-4 rounded-lg bg-white shadow',
    className
  )

  return <div className={cn}>{children}</div>
}

export default Card
