import styled from '@emotion/styled'
import tw from 'twin.macro'
import { useState } from 'react'

import {
  ModalPopover,
  POPOVER_INNER_CONTAINER_ANIMATION_EXIT_DELAY,
  PassedPopoverProps,
  PopoverDismissableHandler,
  PopoverInnerContainer,
} from '@howtolayers/popover-layer'
import { useNotificationsManager } from '@howtolayers/notifications'

import { Button } from '../components/Button'
import { Tooltip } from '../Tooltip'
import { NestedModalPopover } from './NestedModalPopover'

const InnerContainer = styled.div`
  ${tw`px-7 py-5 `}
  max-width: 400px;
  max-height: 600px;
  width: 100vw;
  height: 100vh;
`

const PaddedTooltip = styled.div`
  ${tw`p-5`}
`

const Grid = styled.div`
  ${tw`grid gap-2 grid-cols-1`}
`

export type BalancePopoverProps = PassedPopoverProps

export const BalancePopover: React.FC<BalancePopoverProps> = (props: BalancePopoverProps) => {
  const [isModalPopoverOpened, setModalPopoverOpened] = useState(false)
  const notificationsManager = useNotificationsManager()

  const showNotification = () => {
    notificationsManager.addNotification(
      <span>
        unless you hover me, I will disappear after 5 seconds, and I can properly overlap too!
      </span>
    )
  }

  return (
    <PopoverDismissableHandler animationDelay={250} {...props}>
      <PopoverInnerContainer dismissing={props.dismissing}>
        <InnerContainer>
          <Grid>
            <h4>hello! am a balance popover.</h4>
            <div></div>
            <Button onClick={showNotification}>Show notification</Button>
            <Button onClick={() => setModalPopoverOpened(true)}>Open nested modal</Button>
            <Tooltip content={() => <PaddedTooltip>here goes the tooltip</PaddedTooltip>}>
              <Button>Hover or click me for tooltip</Button>
            </Tooltip>
          </Grid>
          <ModalPopover opened={isModalPopoverOpened} onClosed={() => setModalPopoverOpened(false)}>
            {layer => <NestedModalPopover {...layer} />}
          </ModalPopover>
        </InnerContainer>
      </PopoverInnerContainer>
    </PopoverDismissableHandler>
  )
}
