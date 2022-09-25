import React from 'react'
import { IPartialList } from './interface'
import PartialScreenRenderer from './partial-screen-renderer'

/**
 *
 * @component
 * @param items array of items
 * @param renderItem function to render items, should return a JSX
 * @param skip To Skip the callback queue and renders instantly without any delay or optimisation
 * @param delayStartIndex index from where a delay will be given, usually a index which is not visible to user & delay is acceptable
 * @param delayEndIndex index where delayed rendering ends, usually last element of list or first page of paginated list
 * @param delay Delay to render a component which is under startIndex and endIndex, default is 250
 * @param increaseDelayPerItem to increase delay by certain number for each item between start and end index
 * @param renderItemLoader Adds a loader for each item till your Component is not ready
 * @param onRenderItem Callback when item is rendered
 * @param initialNumToRender Items to be skipped or render instantly without callback queue
 * @param keyExtractor key extractor for list
 * @returns Delayed Children or Loader or empty JSX
 */

export const PartialList = <T extends never[]>({
  items,
  renderItem,
  delayStartIndex,
  delayEndIndex,
  increaseDelayPerItem = 0,
  delay = 250,
  onRenderItem,
  initialNumToRender = 0,
  keyExtractor,
  renderItemLoader,
}: IPartialList<T>) => {
  return (
    <>
      {items.map((item, index) => (
        <PartialScreenRenderer
          key={keyExtractor ? keyExtractor(item, index) : index}
          index={index}
          skip={index < initialNumToRender}
          delay={increaseDelayPerItem ? delay * increaseDelayPerItem : delay}
          startIndex={delayStartIndex}
          onReady={() => onRenderItem?.(item, index)}
          endIndex={delayEndIndex || items.length}
          loader={renderItemLoader ? renderItemLoader(item, index) : undefined}
        >
          {renderItem(item, index)}
        </PartialScreenRenderer>
      ))}
    </>
  )
}
