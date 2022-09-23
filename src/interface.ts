export interface IRenderHelper {
  children: JSX.Element
  delay?: number
  loader?: JSX.Element
  onReady?: () => void
}
export interface IDeferredRenderHelper {
  children: JSX.Element
  loader?: JSX.Element
  onReady?: () => void
}
export interface IPartialScreenRenderer {
  children: JSX.Element
  index: number
  skip?: boolean
  startIndex: number
  endIndex: number
  loader?: JSX.Element
  delay?: number
  onReady?: () => void
}
export interface IPartialList<T> {
  items: T[]
  delayStartIndex: number
  delayEndIndex?: number
  increaseDelayPerItem?: number
  delay?: number
  renderItem: (item: T, index: number) => JSX.Element
  onRenderItem?: (item: T, index: number) => void
  initialNumToRender?: number
  keyExtractor?: (item: T, index: number) => never
}
