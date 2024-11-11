import { AnyFunction } from '@/types/common'
import { useEffect } from 'react'

const useInfiniteScroll = (
  callback: AnyFunction,
  triggerIfCanNotScrollOnMounted?: boolean
) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      if (scrollPosition >= documentHeight - 50) {
        callback()
      }
    }

    const canNotScrollOnMounted =
      document.documentElement.scrollHeight <= window.innerHeight

    if (canNotScrollOnMounted && triggerIfCanNotScrollOnMounted) {
      callback()
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })
}

export default useInfiniteScroll
