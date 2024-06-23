import {
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState
} from 'react'
import Card from '@/components/layout/Card'
import { PopoverType } from '@/types/component/popover'

type PopoverProps = {
  children: ReactNode
  popOverElement: ReactElement<{
    closePopover: () => void
  }>
  type?: PopoverType
  showPopover?: 'boolean'
}

const eventMap = {
  [PopoverType.CLICK]: 'click',
  [PopoverType.HOVER]: 'mousemove'
}

const Popover: FC<PopoverProps> = ({
  children,
  popOverElement,
  type = PopoverType.CLICK,
  showPopover = true
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickEvent = (e: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as HTMLElement)
      ) {
        setOpen(false)
      }
    }

    const eventType = eventMap[type]
    document.addEventListener(eventType, clickEvent)

    return () => {
      document.removeEventListener(eventType, clickEvent)
    }
  }, [type])

  const PopovrElement = cloneElement(popOverElement, {
    closePopover: () => setOpen(false)
  })

  const handleClick = () => {
    if (type !== 'click') return
    setOpen(!open)
  }

  const handleMouseEnter = () => {
    if (type !== 'hover') return
    setOpen(true)
  }

  return (
    <div ref={containerRef} className='relative'>
      <div onClick={handleClick} onMouseEnter={handleMouseEnter}>
        {children}
      </div>
      {open && showPopover && (
        <Card className='absolute right-0 mt-0 shadow-popover p-3'>
          {PopovrElement}
        </Card>
      )}
    </div>
  )
}

export default Popover
