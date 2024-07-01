import Toast from '@/components/toast/Toast'
import useToastContext from '@/hooks/userToastContext'

const ToastContainer = () => {
  const { value } = useToastContext()

  const toastList = value.map((toast) => {
    return (
      <Toast className='mb-4 animate-fade-in-up' {...toast} key={toast.id} />
    )
  })

  return (
    <div id='toast-container' className='fixed z-toast left-8 bottom-8'>
      {toastList}
    </div>
  )
}

export default ToastContainer
