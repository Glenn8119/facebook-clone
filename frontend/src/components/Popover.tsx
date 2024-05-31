import {
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState
} from 'react'
import Card from './layout/Card'

type PopoverProps = {
  children: ReactNode
  popOverElement: ReactElement<{
    closePopover: () => void
  }>
}

const Popover: FC<PopoverProps> = ({ children, popOverElement }) => {
  const [open, setOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as HTMLElement)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('click', clickEvent)

    return () => {
      document.removeEventListener('click', clickEvent)
    }
  }, [])

  const PopovrElement = cloneElement(popOverElement, {
    closePopover: () => setOpen(false)
  })

  return (
    <div ref={containerRef} className='relative'>
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <Card className='absolute right-0 mt-2 shadow-popover p-3'>
          {PopovrElement}
        </Card>
      )}
    </div>
  )
}

export default Popover
