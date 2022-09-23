import { useEffect, useState } from 'react'

export const useReadyRenderHelper = (delay = 0, shouldWait = false, onReady: (() => void) | undefined = undefined) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!shouldWait) {
      const timeout = setTimeout(() => {
        setReady(true)
        onReady?.()
      }, delay || 0)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [shouldWait, delay, onReady])
  return ready
}

export const useDeferredRenderHelper = (shouldWait = false, onReady: (() => void) | undefined = undefined) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!shouldWait) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setReady(true)
          onReady?.()
        })
      })
    }
  }, [shouldWait, onReady])
  return ready
}
