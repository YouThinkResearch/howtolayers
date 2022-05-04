import styled from '@emotion/styled'
import {
  POPOVER_INNER_CONTAINER_ANIMATION_EXIT_DELAY,
  PassedPopoverProps,
  PopoverDismissableHandler,
  PopoverInnerContainer,
} from '@howtolayers/popover-layer'
import { useEffect } from 'react'
import tw from 'twin.macro'

import { Button } from '../components/Button'

const InnerContainer = styled.div`
  ${tw`px-7 py-5`}
  max-width: 300px;
  width: 100vw;
  height: 100%;
`

export type NotificationsPopoverProps = PassedPopoverProps

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = (
  props: NotificationsPopoverProps
) => {
  return (
    <PopoverDismissableHandler animationDelay={250} {...props}>
      <PopoverInnerContainer dismissing={props.dismissing}>
        <InnerContainer>
          <h4>hello! am a notifications popover.</h4>
          <div></div>
          <Button>show notification</Button>
        </InnerContainer>
      </PopoverInnerContainer>
    </PopoverDismissableHandler>
  )
}
