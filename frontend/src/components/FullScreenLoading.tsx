import { FC } from 'react'
import Mask from '@/components/Mask'
import Spin from '@/components/Spin'

type LoadingProps = {
  text?: string
}

const FullScreenLoading: FC<LoadingProps> = ({ text }) => {
  return (
    <Mask>
      <div className='flex flex-col justify-center items-center'>
        <Spin className='mb-3' />
        {text ? <div className='text-xl'>{text}</div> : null}
      </div>
    </Mask>
  )
}

export default FullScreenLoading
