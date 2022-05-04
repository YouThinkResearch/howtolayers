import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

// doesnt work? wtf.
const foregroundAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const BlackForeground = styled.div<{ dismissing: boolean; zIndex?: number }>`
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 1;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex || 1};
  animation: ${foregroundAnimation} 0.25s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ dismissing }) =>
    dismissing
      ? `
    transition: opacity 0.15s ease-in-out;
    opacity: 0;
  `
      : ''}
`
