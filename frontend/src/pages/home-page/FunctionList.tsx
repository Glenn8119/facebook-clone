import Avatar from '@/components/Avatar'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface FunctionListProps {
  className?: string
}

const FunctionList: FC<FunctionListProps> = ({ className }) => {
  const cn = twMerge('h-[calc(100dvh-56px)] p-4', className)

  return (
    <ul className={cn}>
      <li className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'>
        <Avatar className='mr-3' />
        <span>user name</span>
      </li>
      <li className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'>
        <span className='mr-3'>icon</span>
        <span>朋友</span>
      </li>
      <li className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'>
        <span className='mr-3'>icon</span>
        <span>社團</span>
      </li>
    </ul>
  )
}

export default FunctionList
