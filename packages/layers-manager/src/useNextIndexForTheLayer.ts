import { useLayoutEffect, useState } from 'react'

import { useLayerManager } from './useLayerManager'

export function useNextIndexForTheLayer(isOpened: boolean) {
  const manager = useLayerManager()
  const [zIndex, setIndex] = useState(null)

  useLayoutEffect(() => {
    if (isOpened) {
      setIndex(manager.getNextIndexForTheLayer())
    }
  }, [isOpened])

  return zIndex
}
