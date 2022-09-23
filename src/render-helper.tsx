import React from 'react'
import { useReadyRenderHelper } from './hooks'
import { IRenderHelper } from './interface'

const RenderHelper = ({ children, delay, loader, onReady }: IRenderHelper) => {
  const ready = useReadyRenderHelper(delay, false, onReady)

  if (!ready && loader) return loader

  if (!ready) return <></>

  return children
}
export default RenderHelper
