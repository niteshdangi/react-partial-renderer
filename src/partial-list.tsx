import React from 'react'
import { IPartialList } from './interface'
import PartialScreenRenderer from './partial-screen-renderer'

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
        >
          {renderItem(item, index)}
        </PartialScreenRenderer>
      ))}
    </>
  )
}
