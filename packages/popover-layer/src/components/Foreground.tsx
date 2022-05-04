import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

// doesnt work? wtf.
const foregroundAnimation = keyframes`
  from {
    backdrop-filter: blur(4px) opacity(0.9);
  }

  to {
    backdrop-filter: blur(4px) opacity(1);
  }
`

export const Foreground = styled.div<{ dismissing: boolean }>`
  backdrop-filter: blur(4px) opacity(1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  // animation: ${foregroundAnimation} 0.25s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ dismissing }) =>
    dismissing
      ? `
    transition: opacity 0.15s ease-in-out;
    opacity: 0;
  `
      : ''}
`
