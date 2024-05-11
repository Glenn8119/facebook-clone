import Button from '@/components/form/Button'
import useLogout from '@/hooks/useLogout'

const HomePage = () => {
  const logout = useLogout()

  return (
    <>
      <div>Home Page</div>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default HomePage
