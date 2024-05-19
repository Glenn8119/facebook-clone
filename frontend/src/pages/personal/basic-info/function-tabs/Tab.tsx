import { AnyFunction } from '@/types/common'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type TabProps = {
  isActive: boolean
  label: string
  onClick: AnyFunction
}

const Tab: FC<TabProps> = ({ label, isActive, ...props }) => {
  const activeClass = isActive
    ? 'text-blue-600 after:block after:content-[""] after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-blue-600'
    : ''
  const hoverClass = isActive ? '' : 'hover:bg-slate-100'
  const cn = twMerge(
    'relative p-4 rounded cursor-pointer',
    activeClass,
    hoverClass
  )

  return (
    <div className={cn} {...props}>
      {label}
    </div>
  )
}

export default Tab
