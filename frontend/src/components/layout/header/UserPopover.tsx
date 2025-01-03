import { FC } from 'react'
import Avatar from '@/components/Avatar'
import { MdLogout } from 'react-icons/md'
import useLogout from '@/hooks/useLogout'
import useUserContext from '@/hooks/useUserContext'
import useNavigateTo from '@/hooks/useNavigateTo'
import { ROUTES } from '@/constants/common'

type UserPopoverProps = {
  closePopover?: () => void
}

const UserPopover: FC<UserPopoverProps> = ({ closePopover = () => {} }) => {
  const logout = useLogout()
  const navigate = useNavigateTo()
  const {
    value: { name, id }
  } = useUserContext()
  const onClickUser = () => {
    navigate({ pathname: ROUTES.PROFILE, queries: { id } })
    closePopover()
  }

  return (
    <ul className='w-80'>
      <li
        className='flex cursor-pointer items-center hover:bg-slate-100 p-2 rounded-lg'
        onClick={onClickUser}
      >
        <Avatar className='mr-2 basis-9' />
        <span>{name}</span>
      </li>
      <li
        className='flex cursor-pointer items-center hover:bg-slate-100 p-2 rounded-lg'
        onClick={logout}
      >
        <div className='mr-2 basis-9 rounded-full bg-slate-200'>
          <MdLogout className='h-9 mx-auto' />
        </div>
        <div className='cursor-pointer'>登出</div>
      </li>
    </ul>
  )
}

export default UserPopover
