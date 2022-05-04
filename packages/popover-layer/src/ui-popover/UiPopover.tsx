import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { MediaConstants, useMedia } from '@howtolayers/common-hooks'
import {
  Layer,
  LayerRecord,
  componentsZIndex,
  createLayer,
  useLayerManager,
  useNextIndexForTheLayer,
  useOnLayerClickOutside,
} from '@howtolayers/layers-manager'

import { BlackForeground, PassedPopoverProps, PopoverOuterContainer } from '../components'

export interface UiPopoverProps {
  id?: string
  children: (layer: PassedPopoverProps) => ReactElement
  // Whether tooltip should be shown
  opened: boolean
  // Triggered after tooltip close animation have been played out and it's closed
  onClosed?: () => void
}

export const UiPopover: React.FC<UiPopoverProps> = (props: UiPopoverProps) => {
  const { getNextIndexForTheLayer } = useLayerManager()
  const isMobile = !useMedia(MediaConstants.M)
  // Being dismissed is an intermidiate state which indicates that close animation should play out.
  const [beingDismissed, setBeingDismissed] = useState(false)

  // We only need to get it once. It's plus because we need to reserve one for the foreground.
  const layerIndex = useNextIndexForTheLayer(props.opened) + 1
  const foregroundIndex = layerIndex - 1

  const dismissPopover = useCallback(() => setBeingDismissed(true), [])
  const popoverLayer = createLayer({
    zIndex: layerIndex,
    portalled: !!isMobile,
    dismissable: true,
    locksPageScroll: isMobile,
    onDismissed: dismissPopover,
  })

  const foregroundLayer = createLayer({
    zIndex: foregroundIndex,
    portalled: true,
    dismissable: false,
  })

  const destroyPopover = useCallback(() => {
    setBeingDismissed(false)
    props.onClosed()
  }, [])

  const popoverLayerRef = React.createRef<HTMLDivElement>()
  const layerId = useMemo(
    () => (props.id ? props.id : `popover${Math.random().toString(36)}`),
    [props.id]
  )

  useOnLayerClickOutside(popoverLayerRef, layerId)

  return (
    <>
      <Layer {...foregroundLayer} id={`${layerId}-foreground`} opened={props.opened && isMobile}>
        <BlackForeground dismissing={beingDismissed} zIndex={popoverLayer.zIndex} />
      </Layer>
      <Layer {...popoverLayer} id={layerId} opened={props.opened}>
        <PopoverOuterContainer
          height='300px'
          ref={popoverLayerRef}
          mobile={isMobile}
          zIndex={popoverLayer.zIndex}
        >
          {props.children({
            ...popoverLayer,
            dismiss: dismissPopover,
            destroy: destroyPopover,
            dismissing: beingDismissed,
          })}
        </PopoverOuterContainer>
      </Layer>
    </>
  )
}
