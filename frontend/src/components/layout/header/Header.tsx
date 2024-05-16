import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import useLogout from '@/hooks/useLogout'
import { MdFacebook } from 'react-icons/md'

const Header = () => {
  const logOut = useLogout()

  return (
    <header className='py-2 px-4 flex items-center w-full fixed top-0 h-14 shadow-lg  bg-white'>
      <MdFacebook className='mr-2' size={40} color='#1E90FF' />
      <Input
        placeholder='搜尋 FaceLook'
        className='mr-auto w-60 rounded-full h-10 bg-gray-100 border-none'
      />
      <div onClick={logOut}>
        <Avatar className='cursor-pointer' />
      </div>
    </header>
  )
}

export default Header
