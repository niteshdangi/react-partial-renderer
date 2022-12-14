import React from 'react'
import { useReadyRenderHelper } from './hooks'
import { IRenderHelper } from './interface'

/**
 *
 * @param delay Delay to render a component default is 0
 * @param loader Adds a loader till your Component is not ready
 * @param onReady Callback when component is rendered
 * @param batchId For Batching multiple components
 * @returns Delayed Children or Loader or empty JSX
 */

const RenderHelper = ({ children, delay, loader, onReady, batchId }: IRenderHelper) => {
  const ready = useReadyRenderHelper(delay, onReady, batchId)

  if (!ready && loader) return loader

  if (!ready) return <></>

  return children
}
export default RenderHelper
