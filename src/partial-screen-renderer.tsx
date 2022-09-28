import React from 'react'
import { IPartialScreenRenderer } from './interface'
import RenderHelper from './render-helper'

/**
 *
 * @param index Index of current component in list used identify render sequence
 * @param skip To Skip the callback queue and renders instantly without any delay or optimisation
 * @param startIndex index from where a delay will be given, usually a index which is not visible to user & delay is acceptable
 * @param endIndex index where delayed rendering ends, usually last element of list or first page of paginated list
 * @param delay Delay to render a component which is under startIndex and endIndex, default is 250
 * @param loader Adds a loader till your Component is not ready
 * @param onReady Callback when component is rendered
 * @param batchId For Batching multiple components
 * @returns Delayed Children or Loader or empty JSX
 */

const PartialScreenRenderer = ({
  children,
  index,
  skip,
  startIndex,
  endIndex,
  loader,
  delay,
  onReady,
  batchId,
}: IPartialScreenRenderer) => {
  if (skip) return children

  if (index <= startIndex)
    return (
      <RenderHelper batchId={batchId} onReady={onReady} loader={loader}>
        {children}
      </RenderHelper>
    )

  if (index > startIndex && index < endIndex) {
    return (
      <RenderHelper batchId={batchId} onReady={onReady} loader={loader} delay={delay || 250}>
        {children}
      </RenderHelper>
    )
  }
  return children
}

export default PartialScreenRenderer
