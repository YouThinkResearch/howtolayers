import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import { MediaConstants, useMedia } from '@howtolayers/common-hooks'
import { Layer, LayerProvider, createLayer } from '@howtolayers/layers-manager'
import { Flex } from '@howtolayers/notifications/src/externals/Flex'

import { NavigationPopoverWithForeground, PopoverInnerContainer } from '@howtolayers/popover-layer'
import { useState } from 'react'
import tw from 'twin.macro'

import { BalancePopover } from './BalancePopover'
import { NotificationsPopover } from './NotificationsPopover'

const BaseContainer = styled.div`
  ${tw`flex items-center justify-between text-gray-700 h-20 px-10 relative`}
  z-index: 2;
`

const CoinsContainer = styled.div`
  ${tw`relative`}
`

const Coins = styled.div`
  ${tw`
    p-3 hover:bg-green-100 rounded px-6 cursor-pointer
  `}
`

export const Navigation = () => {
  const mobile = !useMedia(MediaConstants.M)
  const [currentlyOpened, setCurrentlyOpened] = useState(null)

  const foreground = createLayer({
    zIndex: 1,
    dismissable: false,
    portalled: true,
  })

  const setCurrentlyOpenedOrToggle = name => () =>
    setCurrentlyOpened(prevState => (prevState === name ? null : name))

  return (
    <BaseContainer>
      <div>youthink!</div>
      <Flex>
        <CoinsContainer>
          <Coins onClick={setCurrentlyOpenedOrToggle('notifications')}>navigation</Coins>
          <NavigationPopoverWithForeground
            opened={currentlyOpened === 'notifications'}
            onClosed={() => setCurrentlyOpened(null)}
          >
            {layerProps => <NotificationsPopover {...layerProps} />}
          </NavigationPopoverWithForeground>
        </CoinsContainer>

        <CoinsContainer>
          <Coins onClick={setCurrentlyOpenedOrToggle('balance')}># 200 ₽</Coins>
          <NavigationPopoverWithForeground
            id='balance'
            opened={currentlyOpened === 'balance'}
            onClosed={() => setCurrentlyOpened(null)}
          >
            {layerProps => <BalancePopover {...layerProps} />}
          </NavigationPopoverWithForeground>
        </CoinsContainer>
      </Flex>
    </BaseContainer>
  )
}
