import React, { createContext, useContext } from 'react'

import { LayerManagerContextType, LayerManagerState } from './LayerManagerUtilities'

const uninitialized = () => {
  throw new Error(`<LayerProvider /> was not initialized`)
}

export const LayerContext = createContext<LayerManagerContextType>({
  layers: [],
  layersContainer: null,
  setLayersState: uninitialized as never,
})
