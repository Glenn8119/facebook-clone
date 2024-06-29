import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '@/pages/login/Login.tsx'
import HomePage from '@/pages/home-page/HomePage.tsx'
import AuthRoute from '@/components/AuthRoute'
import PersonalPage from '@/pages/personal/Personal'
import FullScreenLoading from '@/components/FullScreenLoading'
import useLoadingContext from '@/hooks/useLoading'
import ToastContainer from '@/components/toast/ToastContainer'
import { createPortal } from 'react-dom'
import { ROUTES } from '@/constants/common'

const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      { element: <HomePage />, path: ROUTES.HOME_PAGE },
      {
        element: <PersonalPage />,
        path: ROUTES.PROFILE
      }
    ]
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />
  }
])

function App() {
  const {
    value: { isLoading, text }
  } = useLoadingContext()

  return (
    <>
      {isLoading ? <FullScreenLoading text={text} /> : null}
      <RouterProvider router={router} />
      {createPortal(<ToastContainer />, document.body)}
    </>
  )
}

export default App
