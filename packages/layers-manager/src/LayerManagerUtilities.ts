import React, { SetStateAction } from 'react'

export type DismissablePossibleEvents = 'swipe-down' | 'escape-key' | 'outside-click'
export type ExpectedRef = React.RefObject<HTMLElement>
export type CallbackOrObject<T> = (() => T) | T

export interface LayerRecord {
  id?: string
  zIndex: number
  dismissable: false | DismissablePossibleEvents[]
  locksPageScroll?: boolean
  onDismissed?: () => void
  portalled: boolean
}

export interface LayerManagerState {
  layers: LayerRecord[]
  layersContainer?: HTMLElement
}

export type LayerRefMappings = Map<string, HTMLElement>
export type LayerSetSignature = (prevState: LayerRefMappings) => LayerRefMappings

export type LayerManagerContextType = LayerManagerState & {
  setLayersState: (state: SetStateAction<LayerManagerState>) => void
}

export const createLayer = (
  record: Omit<LayerRecord, 'id' | 'dismissable'> & {
    dismissable: boolean | DismissablePossibleEvents
  }
): LayerRecord => {
  return {
    ...record,
    dismissable:
      record.dismissable === true ? ['swipe-down', 'escape-key', 'outside-click'] : false,
  }
}
