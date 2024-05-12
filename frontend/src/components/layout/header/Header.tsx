import Avatar from '@/components/Avatar'
import Input from '@/components/form/Input'
import useLogout from '@/hooks/useLogout'

const Header = () => {
  const logOut = useLogout()

  return (
    <header className='py-2 px-4 flex items-center w-full fixed top-0 h-14 shadow-lg  bg-white'>
      {/* TODO: header icons */}
      <div className='mr-2'>logo</div>
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
