import { FC, ReactNode } from 'react'

interface MaskProps {
  children: ReactNode
}

const Mask: FC<MaskProps> = ({ children }) => {
  return (
    <div className='fixed bg-white/70 inset-0 w-dvw h-dvh flex items-center justify-center'>
      {children}
    </div>
  )
}

export default Mask
