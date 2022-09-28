import { useEffect, useRef, useState } from 'react'
import uuid from 'uuid'
import queueManager from './queue-manager'
/**
 *
 * @param delay Delay to render a component default is 0
 * @param onReady Callback when component is rendered
 * @param batchId For Batching multiple components
 * @returns Delayed Children or Loader or empty JSX
 */

export const useReadyRenderHelper = (delay = 0, onReady: (() => void) | undefined = undefined, batchId = '') => {
  const [ready, setReady] = useState(false)
  const id = useRef(uuid.v4())
  useEffect(() => {
    const timeout = queueManager.add(
      id.current,
      () => {
        setReady(true)
        onReady?.()
      },
      delay || 0,
      batchId,
    )
    return () => {
      clearTimeout(timeout)
      queueManager.remove(id.current)
      id.current = uuid.v4()
    }
  }, [])
  return ready
}

/**
 *
 * @param onReady Callback when component is rendered
 * @returns Delayed Children or Loader or empty JSX
 */

export const useDeferredRenderHelper = (onReady: (() => void) | undefined = undefined) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true)
        onReady?.()
      })
    })
  }, [])
  return ready
}
