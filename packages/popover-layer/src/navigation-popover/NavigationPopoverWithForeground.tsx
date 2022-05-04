import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { MediaConstants, useMedia } from '@howtolayers/common-hooks'
import {
  Layer,
  componentsZIndex,
  createLayer,
  useOnLayerClickOutside,
} from '@howtolayers/layers-manager'

import { Foreground, PassedPopoverProps, PopoverOuterContainer } from '../components'

export interface PopoverProps {
  id?: string
  children: (layer: PassedPopoverProps) => ReactElement
  // Whether tooltip should be shown
  opened: boolean
  // Triggered after tooltip close animation have been played out and it's closed
  onClosed?: () => void
}

export const NavigationPopoverWithForeground: React.FC<PopoverProps> = (props: PopoverProps) => {
  const isMobile = !useMedia(MediaConstants.M)
  // Being dismissed is an intermidiate state which indicates that close animation should play out.
  const [beingDismissed, setBeingDismissed] = useState(false)
  // It's not currently working well with the layer manager.. gotta understand why.
  // const [locallyOpened, setLoclalyOpened] = useState(() => props.opened)

  // // If popover was closed by specifying closed={true}, we have to animnate it first.
  // useEffect(() => {
  //   if (locallyOpened && !props.opened && !beingDismissed) {
  //     setBeingDismissed(true)
  //   } else if (props.opened && !locallyOpened) [
  //     setLoclalyOpened(true)
  //   ]
  // }, [props.opened])

  // const isPopoverOpened = locallyOpened
  const isPopoverOpened = props.opened

  const dismissPopover = useCallback(() => setBeingDismissed(true), [])
  const popoverLayer = createLayer({
    zIndex: componentsZIndex.popovers,
    portalled: !!isMobile,
    dismissable: true,
    locksPageScroll: isMobile,
    onDismissed: dismissPopover,
  })

  const foregroundLayer = createLayer({
    zIndex: componentsZIndex.foreground,
    portalled: true,
    dismissable: false,
  })

  const destroyPopover = useCallback(() => {
    setBeingDismissed(false)
    // setLoclalyOpened(false)
    props.onClosed()
  }, [])

  const popoverLayerRef = React.createRef<HTMLDivElement>()
  const layerId = useMemo(
    () => (props.id ? props.id : `npwf${Math.random().toString(36)}`),
    [props.id]
  )

  useOnLayerClickOutside(popoverLayerRef, layerId)

  return (
    <>
      <Layer
        {...foregroundLayer}
        id={`${layerId}-foreground`}
        opened={isPopoverOpened && !isMobile}
      >
        <Foreground dismissing={beingDismissed} />
      </Layer>
      <Layer {...popoverLayer} id={layerId} opened={isPopoverOpened}>
        <PopoverOuterContainer mobile={isMobile} zIndex={popoverLayer.zIndex} ref={popoverLayerRef}>
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
