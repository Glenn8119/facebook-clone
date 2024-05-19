import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import useLogout from '@/hooks/useLogout'
import { MdFacebook } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const logOut = useLogout()
  const navigate = useNavigate()

  return (
    <header className='py-2 px-4 flex items-center w-full fixed top-0 h-14 shadow-lg  bg-white'>
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
      <div onClick={logOut}>
        <Avatar className='cursor-pointer' />
      </div>
    </header>
  )
}

export default Header
