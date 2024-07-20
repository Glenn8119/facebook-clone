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
  closeWhenClicked?: boolean
  popOverClass?: string
  containerClass?: string
}

const eventMap = {
  [PopoverType.CLICK]: 'click',
  [PopoverType.HOVER]: 'mousemove'
}

type PositionStyle = Record<
  'top' | 'bottom' | 'right' | 'left',
  string | number
>

const defaultPositionStyle = {
  right: 0
} as PositionStyle

const calculatePosition = (el: HTMLDivElement) => {
  const rect = el.getBoundingClientRect()
  const height = el.clientHeight
  const windowHeight = window.innerHeight
  const isOffScreenLeft = rect.left < 0
  const isOffScreenBottom = rect.bottom > windowHeight

  const output = { ...defaultPositionStyle }

  if (isOffScreenLeft) {
    output.left = 0
  }

  if (isOffScreenBottom) {
    output.top = -height
  }

  return output
}

const Popover: FC<PopoverProps> = ({
  children,
  popOverElement,
  type = PopoverType.CLICK,
  closeWhenClicked = false,
  popOverClass,
  containerClass
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [positionStyle, setPositionStyle] = useState(defaultPositionStyle)

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
    if (popoverRef.current) {
      setPositionStyle(calculatePosition(popoverRef.current))
    }

    return () => {
      document.removeEventListener(eventType, clickEvent)
    }
  }, [type, open])

  const PopovrElement = cloneElement(popOverElement, {
    closePopover: () => setOpen(false)
  })

  const popoverCn = twMerge(
    'absolute w-min right-0 mt-0 shadow-popover p-3 z-max',
    popOverClass,
    !open ? 'hidden' : ''
  )

  const containerCn = twMerge('relative', containerClass)

  const handleClick = () => {
    if (type !== 'click') return
    setOpen(!open)
  }

  const handleMouseEnter = () => {
    if (type !== 'hover') return
    setOpen(true)
  }

  const handleClickCard = () => {
    closeWhenClicked && setOpen(false)
  }

  return (
    <div ref={containerRef} className={containerCn}>
      <div onClick={handleClick} onMouseEnter={handleMouseEnter}>
        {children}
      </div>
      <Card
        ref={popoverRef}
        className={popoverCn}
        onClick={handleClickCard}
        style={positionStyle}
      >
        {PopovrElement}
      </Card>
    </div>
  )
}

export default Popover
