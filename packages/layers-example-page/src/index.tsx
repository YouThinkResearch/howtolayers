import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Global, css } from '@emotion/react'

import { LayerPresense, LayerProvider } from '@howtolayers/layers-manager'
import { NotificaitonsDisplayer, StoreProvider } from '@howtolayers/notifications'

import { Button } from './components/Button'
import { Navigation } from './navigation'
import { useEffect } from 'react'

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
  useEffect(() => {
    const handler = () => {
      document.documentElement.style.setProperty('--1dvh', `${window.innerHeight * 0.01}px`)
    }

    handler()

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [])
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
