import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import HomePage from './pages/home-page/HomePage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
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
