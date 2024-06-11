import Avatar from '@/components/Avatar'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdGroup, MdGroups } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import useUserContext from '@/hooks/useUserContext'

interface FunctionListProps {
  className?: string
}

const FunctionList: FC<FunctionListProps> = ({ className }) => {
  const cn = twMerge('h-[calc(100dvh-56px)] p-4', className)
  const {
    value: { name }
  } = useUserContext()
  const navigate = useNavigate()

  return (
    <ul className={cn}>
      <li
        className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'
        onClick={() => navigate('/personal')}
      >
        <Avatar className='mr-3' />
        <span>{name}</span>
      </li>
      <li className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'>
        <span className='mr-3'>
          <MdGroup color='lightblue' size={32} />
        </span>
        <span>朋友</span>
      </li>
      <li className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'>
        <span className='mr-3'>
          <MdGroups color='gray' size={32} />
        </span>
        <span>社團</span>
      </li>
    </ul>
  )
}

export default FunctionList
