import { ToastType } from '@/types/context/toast'
import { FC } from 'react'
import Card from '@/components/layout/Card'
import { MdCheckCircle } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

type ToastProps = {
  type: ToastType
  title: string
  content?: string
  className?: string
}

const Toast: FC<ToastProps> = ({ type, title, content, className }) => {
  const cn = twMerge(className)

  const getIcon = () => {
    switch (type) {
      case 'SUCCESS':
        return <MdCheckCircle className='mr-3' color='#00CC00' size={24} />
    }
  }

  return (
    <Card className={cn}>
      <div className='flex  items-center'>
        {getIcon()}
        <div className='flex flex-col justify-center'>
          <div className='font-semibold'>{title}</div>
          {content ? <div>{content}</div> : null}
        </div>
      </div>
    </Card>
  )
}

export default Toast
