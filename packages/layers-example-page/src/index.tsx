import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Global, css } from '@emotion/react'

import { LayerPresense, LayerProvider } from '@howtolayers/layers-manager'
import { NotificaitonsDisplayer, StoreProvider } from '@howtolayers/notifications'

import { Button } from './components/Button'
import { Navigation } from './navigation'

const BaseContainer = styled.div`
  ${tw`pt-10 pl-10 relative grid gap-8 grid-cols-1`}

  & > * {
    width: fit-content;
  }
`

const GlobalStyles = () => (
  <Global
    styles={css`
      #__next,
      body {
        background: rgba(247, 247, 250, 1);
      }
    `}
  />
)

export const LayersPage = () => {
  return (
    <>
      <GlobalStyles />
      <StoreProvider>
        <LayerProvider getLayersContainer={() => document.getElementById('portals')!!}>
          <Navigation />
          <BaseContainer>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <Button>some inactive button..</Button>
            <p>some long text..</p>
            <p>some long text..</p>

            <p>some long text..</p>
            <p>some long text..</p>
          </BaseContainer>

          <NotificaitonsDisplayer />
          <LayerPresense />
        </LayerProvider>
      </StoreProvider>
    </>
  )
}
