import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import UserContextProvider from '@/context/UserContextProvider'
import LoadingContextProvider from '@/context/LoadingContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
