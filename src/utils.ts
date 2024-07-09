import { useCallback, useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = useCallback(node => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.addEventListener('resize', onResize)
    }
  }, [])

  return size
}
