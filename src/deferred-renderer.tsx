import React, { ComponentType } from 'react'
import { useDeferredRenderHelper } from './hooks'
import { IDeferredRenderHelper } from './interface'

export const DeferredRenderHelper = ({ children, loader, onReady }: IDeferredRenderHelper) => {
  const ready = useDeferredRenderHelper(false, onReady)

  if (!ready && loader) return loader

  if (!ready) return <></>

  return children
}

export const deferRender = <T extends ComponentType<any>>(Comp: T, loader?: JSX.Element): T => {
  return ((props: any) => (
    <DeferredRenderHelper loader={loader}>
      <Comp {...props} />
    </DeferredRenderHelper>
  )) as unknown as T
}
