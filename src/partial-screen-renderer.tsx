import React from 'react'
import { IPartialScreenRenderer } from './interface'
import RenderHelper from './render-helper'

const PartialScreenRenderer = ({
  children,
  index,
  skip,
  startIndex,
  endIndex,
  loader,
  delay,
  onReady,
}: IPartialScreenRenderer) => {
  if (skip) return children

  if (index <= startIndex)
    return (
      <RenderHelper onReady={onReady} loader={loader}>
        {children}
      </RenderHelper>
    )

  if (index > startIndex && index < endIndex) {
    return (
      <RenderHelper onReady={onReady} loader={loader} delay={delay || 250}>
        {children}
      </RenderHelper>
    )
  }
  return children
}

export default PartialScreenRenderer
