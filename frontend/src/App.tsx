import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '@/pages/login/Login.tsx'
import HomePage from '@/pages/home-page/HomePage.tsx'
import AuthRoute from '@/components/AuthRoute'

const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [{ element: <HomePage />, path: '/' }]
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
