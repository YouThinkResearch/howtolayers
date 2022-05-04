import styled from '@emotion/styled'
import tw from 'twin.macro'
import { keyframes } from '@emotion/react'

export const POPOVER_INNER_CONTAINER_ANIMATION_EXIT_DELAY = 250

export const popoverAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px)
  }

  to {
    opacity: 1;
    transform: translateY(0px)
  }
`
export const PopoverInnerContainer = styled.div<{ dismissing: boolean }>`
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05), 0px 0px 40px rgba(0, 0, 0, 0.05);
  ${tw`overflow-hidden rounded-lg bg-white`}
  opacity: 1;
  animation: ${popoverAnimation} 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  height: 100%;

  ${({ dismissing }) =>
    dismissing
      ? `
    transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    opacity: 0;
    transform: translateY(-10px)
  `
      : ''}

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
`
