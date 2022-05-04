import { useCallback, useContext } from 'react'
import useLatest from 'use-latest'

import { LayerContext } from './LayerContext'
import { DismissablePossibleEvents, LayerRecord } from './LayerManagerUtilities'

export const useLayerManager = () => {
  const { layers, layersContainer, setLayersState } = useContext(LayerContext)

  const layersRef = useLatest(layers)

  const getNextIndexForTheLayer = useCallback(() => {
    return Math.max(...layers.map(d => d.zIndex), 0) + 1
  }, [layers.length])

  const destroyLayer = useCallback(
    (idToRemove: string) => {
      if (layersRef.current.find(({ id }) => id === idToRemove)) {
        setLayersState(prevState => ({
          ...prevState,
          layers: prevState.layers.filter(({ id }) => id !== idToRemove),
        }))
      }
    },
    [layers]
  )

  const appendLayer = useCallback((layer: LayerRecord) => {
    setLayersState(prevState => ({
      ...prevState,
      layers: [...prevState.layers, layer],
    }))
  }, [])

  const findDismissableLayer = useCallback(
    (eventType: DismissablePossibleEvents = 'outside-click') => {
      return layers.reverse().find(d => d.dismissable && d.dismissable.includes(eventType))
    },
    [layers]
  )

  return {
    destroyLayer,
    layers,
    layersContainer,
    appendLayer,
    findDismissableLayer,
    getNextIndexForTheLayer,
  }
}
