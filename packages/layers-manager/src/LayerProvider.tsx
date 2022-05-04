import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { LayerContext } from './LayerContext'
import { DismissablePossibleEvents, LayerManagerState, LayerRecord } from './LayerManagerUtilities'

export interface LayerProviderProps {
  children: React.ReactNode
  getLayersContainer: () => HTMLElement
}

export const LayerProvider: React.FC<LayerProviderProps> = (props: LayerProviderProps) => {
  const [layerState, setLayersState] = useState<LayerManagerState>({
    layers: [],
    layersContainer: null,
  })

  // Initialize layers container
  useEffect(() => {
    const layersContainer = props.getLayersContainer()

    setLayersState(prevState => ({
      ...prevState,
      layersContainer,
    }))
  }, [])

  const contextValue = {
    ...layerState,
    setLayersState,
  }

  return <LayerContext.Provider value={contextValue}>{props.children}</LayerContext.Provider>
}
