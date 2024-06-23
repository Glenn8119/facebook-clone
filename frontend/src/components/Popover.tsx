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
import { twMerge } from 'tailwind-merge'

type PopoverProps = {
  children: ReactNode
  popOverElement: ReactElement<{
    closePopover: () => void
  }>
  type?: PopoverType
  showPopover?: boolean
  popOverClass?: string
}

const eventMap = {
  [PopoverType.CLICK]: 'click',
  [PopoverType.HOVER]: 'mousemove'
}

const Popover: FC<PopoverProps> = ({
  children,
  popOverElement,
  type = PopoverType.CLICK,
  showPopover = true,
  popOverClass
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

  const popoverCn = twMerge(
    'absolute right-0 mt-0 shadow-popover p-3 z-max',
    popOverClass
  )

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
        <Card className={popoverCn}>{PopovrElement}</Card>
      )}
    </div>
  )
}

export default Popover
