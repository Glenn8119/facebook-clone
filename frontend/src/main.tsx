import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import UserContextProvider from '@/context/UserContextProvider'
import LoadingContextProvider from '@/context/LoadingContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastContextProvider from './context/ToastContextProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <LoadingContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </LoadingContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
