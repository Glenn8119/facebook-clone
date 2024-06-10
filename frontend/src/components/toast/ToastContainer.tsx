import { ToastContext } from '@/context/ToastContextProvider'
import { useContext } from 'react'
import Toast from '@/components/toast/Toast'

const ToastContainer = () => {
  const { value } = useContext(ToastContext)

  const toastList = value.map((toast) => {
    return <Toast className='mb-4' {...toast} key={toast.id} />
  })

  return (
    <div id='toast-container' className='fixed left-8 bottom-8'>
      {toastList}
    </div>
  )
}

export default ToastContainer
