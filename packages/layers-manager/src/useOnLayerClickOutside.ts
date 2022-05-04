import { useEffect } from 'react'
import useLatest from 'use-latest'

import { useLayerActions } from './useLayerActions'

const CLICK = 'click'

type HandledEvents = [typeof CLICK]
type HandledEventsType = HandledEvents[number]
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type]
}[HandledEventsType]
type Handler = (event: PossibleEvent) => void

const events: HandledEvents = [CLICK]

export function useOnLayerClickOutside(ref: React.RefObject<HTMLElement>, layerId: string) {
  if (typeof document === 'undefined') {
    return
  }

  const log = (...msg: any[]) => console.log(`useOnLayerClickOutside(${layerId}): `, ...msg)
  const layerActions = useLayerActions(layerId)
  const actionsRef = useLatest(layerActions)

  log('useOnLayerClickOutside: does the layer exist: ', layerActions.exists)
  useEffect(() => {
    if (!layerActions.exists) {
      log('layer doesnt exist: ', layerId, layerActions)
      return
    }

    log('exists!')

    const listener = (event: PossibleEvent) => {
      const isLayerActive = actionsRef.current.isLayerActive()

      log('event triggered: ', actionsRef.current.isLayerActive())
      if (
        !ref.current ||
        event.defaultPrevented ||
        !isLayerActive ||
        ref.current.contains(event.target as Node)
      ) {
        return
      }

      log('triggering dismiss', isLayerActive)

      event.stopPropagation()
      actionsRef.current.dismiss()
    }

    events.forEach(event => {
      document.addEventListener(event, listener)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, listener)
      })
    }
  }, [layerActions.exists, ref])
}
