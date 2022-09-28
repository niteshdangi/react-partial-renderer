import React, { ComponentType } from 'react'
import { useDeferredRenderHelper } from './hooks'
import { IDeferredRenderHelper } from './interface'

/**
 *
 * @param loader Adds a loader till your Component is not ready
 * @param onReady Callback when component is rendered
 * @returns Delayed Children or Loader or empty JSX
 */

export const DeferredRenderHelper = ({ children, loader, onReady }: IDeferredRenderHelper) => {
  const ready = useDeferredRenderHelper(onReady)

  if (!ready && loader) return loader

  if (!ready) return <></>

  return children
}

/**
 *
 * @param Component Component to defer render
 * @param loader Adds a loader till your Component is not ready
 * @returns Delayed Children or Loader or empty JSX
 */

export const deferRender = <T extends ComponentType<any>>(Comp: T, loader?: JSX.Element): T => {
  return ((props: any) => (
    <DeferredRenderHelper loader={loader}>
      <Comp {...props} />
    </DeferredRenderHelper>
  )) as unknown as T
}
