import { FC } from 'react'
import Mask from '@/components/Mask'
import Spin from '@/components/Spin'

type LoadingProps = {
  text?: string
}

const FullScreenLoading: FC<LoadingProps> = ({ text }) => {
  return (
    <Mask>
      <Spin />
      {text ? <div>{text}</div> : null}
    </Mask>
  )
}

export default FullScreenLoading
