import Avatar from '@/components/Avatar'
import Popover from '@/components/Popover'
import { MdFacebook } from 'react-icons/md'
import UserPopover from '@/components/layout/header/UserPopover'
import useNavigateTo from '@/hooks/useNavigateTo'
import { ROUTES } from '@/constants/common'
import useUserContext from '@/hooks/useUserContext'

const Header = () => {
  const navigate = useNavigateTo()
  const {
    value: { avatarImage }
  } = useUserContext()

  return (
    <header className='py-2 px-4 flex items-center w-full fixed top-0 h-14 shadow-lg  bg-white z-header'>
      <MdFacebook
        className='mr-auto cursor-pointer'
        size={40}
        color='#1E90FF'
        onClick={() => navigate({ pathname: ROUTES.HOME_PAGE })}
      />
      <Popover popOverElement={<UserPopover />}>
        <div className='relative cursor-pointer active:scale-95'>
          <Avatar className='cursor-pointer' imgUrl={avatarImage} />
          <div className='absolute inset-0 w-full h-full hover:bg-black hover:opacity-10 rounded-full' />
        </div>
      </Popover>
    </header>
  )
}

export default Header
