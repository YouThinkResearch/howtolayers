import { ReactElement, useEffect, useMemo } from 'react'

import { useLayerManager } from './useLayerManager'

export const LayerPresense: React.FC<{}> = (props: { children?: ReactElement }) => {
  const { layers, findDismissableLayer } = useLayerManager()

  const hasLayerLockingScroll = useMemo(() => layers.find(d => d.locksPageScroll), [layers])

  useEffect(() => {
    if (hasLayerLockingScroll) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = null
    }

    return () => {
      document.body.style.overflow = null
    }
  }, [hasLayerLockingScroll])

  useEffect(() => {
    const appContainer = document
    // Handles ESC press which leads to the extermination of the layer
    const handleKeydownEvent = event => {
      if (event.defaultPrevented) {
        return
      }

      if (event.keyCode === 27) {
        const dismissableLayer = findDismissableLayer('escape-key')
        dismissableLayer?.onDismissed()
      }
    }

    appContainer.addEventListener('keydown', handleKeydownEvent)

    return () => {
      appContainer.removeEventListener('keydown', handleKeydownEvent)
    }
  }, [findDismissableLayer])

  return props.children
}
