import { AnyFunction } from '@/types/common'
import { FC, ReactNode } from 'react'

type MaskProps = {
  children: ReactNode
  handleMaskClick?: AnyFunction
}

const Mask: FC<MaskProps> = ({ children, handleMaskClick }) => {
  return (
    <div
      className='fixed bg-white/70 inset-0 w-dvw h-dvh flex items-center justify-center z-mask'
      onClick={handleMaskClick}
    >
      {children}
    </div>
  )
}

export default Mask
