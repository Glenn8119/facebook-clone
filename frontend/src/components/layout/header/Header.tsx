import Avatar from '@/components/Avatar'
import Popover from '@/components/Popover'
import Input from '@/components/form/Input'
import { MdFacebook } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import UserPopover from '@/components/layout/header/UserPopover'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className='py-2 px-4 flex items-center w-full fixed top-0 h-14 shadow-lg  bg-white z-header'>
      <MdFacebook
        className='mr-2 cursor-pointer'
        size={40}
        color='#1E90FF'
        onClick={() => navigate('/')}
      />
      <Input
        placeholder='搜尋 FaceLook'
        className='mr-auto w-60 rounded-full h-10 bg-gray-100 border-none'
      />
      <Popover popOverElement={<UserPopover />}>
        <div className='relative cursor-pointer active:scale-95'>
          <Avatar className='cursor-pointer' />
          <div className='absolute inset-0 w-full h-full hover:bg-black hover:opacity-10 rounded-full' />
        </div>
      </Popover>
    </header>
  )
}

export default Header
