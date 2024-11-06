import { AnyFunction } from '@/types/common'
import { useEffect } from 'react'

const useInfiniteScroll = (callback: AnyFunction) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      if (scrollPosition >= documentHeight) {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })
}

export default useInfiniteScroll
