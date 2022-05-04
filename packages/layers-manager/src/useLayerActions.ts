import { useCallback } from 'react'

import { useLayerManager } from './useLayerManager'

export function useLayerActions(layerId: string) {
  const { findDismissableLayer, layers } = useLayerManager()

  const layer = layers.find(({ id }) => id === layerId)
  const dismiss = useCallback(() => layer?.onDismissed(), [layer])

  const isLayerActive = useCallback(() => {
    const activeLayerId = findDismissableLayer().id
    return activeLayerId === layerId
  }, [findDismissableLayer, layers])

  return {
    exists: !!layer,
    isLayerActive,
    layer,
    dismiss,
  }
}
