import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import UserContextProvider from '@/context/UserContextProvider'
import LoadingContextProvider from '@/context/LoadingContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastContextProvider from './context/ToastContextProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <LoadingContextProvider>
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </LoadingContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
