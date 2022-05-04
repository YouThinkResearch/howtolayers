import React, { ReactElement, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { LayerRecord } from './LayerManagerUtilities'
import { useLayerManager } from './useLayerManager'

export type LayerProps = LayerRecord & {
  children: ReactElement
  opened?: boolean
  id: string
}

export const Layer: React.FC<LayerProps> = (props: LayerProps) => {
  const opened = props.opened ?? true
  const manager = useLayerManager()

  useEffect(() => {
    if (opened) {
      manager.appendLayer(props)
    }

    return () => {
      manager.destroyLayer(props.id)
    }
  }, [props.opened, props.portalled, props.zIndex, props.id])

  if (!opened) {
    return null
  }

  if (props.portalled) {
    if (!manager.layersContainer) {
      return null
    }

    return createPortal(props.children, manager.layersContainer)
  }

  return props.children
}
