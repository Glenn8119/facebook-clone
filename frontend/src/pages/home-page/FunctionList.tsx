import Avatar from '@/components/Avatar'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdGroup, MdGroups } from 'react-icons/md'
import useUserContext from '@/hooks/useUserContext'
import { PERSONAL_QUERIES } from '@/constants/pages/personal'
import { ROUTES } from '@/constants/common'
import useNavigateTo from '@/hooks/useNavigateTo'

interface FunctionListProps {
  className?: string
}

const FunctionList: FC<FunctionListProps> = ({ className }) => {
  const cn = twMerge('h-[calc(100dvh-56px)] p-4', className)
  const {
    value: { name, id }
  } = useUserContext()
  const navigate = useNavigateTo()

  return (
    <ul className={cn}>
      <li
        className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'
        onClick={() =>
          navigate({
            pathname: ROUTES.PROFILE,
            queries: { id }
          })
        }
      >
        <Avatar className='mr-3' />
        <span>{name}</span>
      </li>
      <li
        className='flex items-center p-2 rounded-lg h-14 cursor-pointer hover:bg-slate-200'
        onClick={() =>
          navigate({
            pathname: ROUTES.PROFILE,
            queries: {
              id,
              tab: PERSONAL_QUERIES.FRIENDS
            }
          })
        }
      >
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
