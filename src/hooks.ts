import { useEffect, useState } from 'react'

/**
 *
 * @param delay Delay to render a component default is 0
 * @param shouldWait Wait for this value to be true before a component renders
 * @param onReady Callback when component is rendered
 * @returns Delayed Children or Loader or empty JSX
 */

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

/**
 *
 * @param shouldWait Wait for this value to be true before a component renders
 * @param onReady Callback when component is rendered
 * @returns Delayed Children or Loader or empty JSX
 */

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
