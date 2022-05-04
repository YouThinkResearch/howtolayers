import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import { InfoIcon, useManagedTimeout } from '../externals'
import { UINotification } from '../provider'

const pop = keyframes`
  0% {
    opacity: 0.1;
    transform: translateY(15px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`

const InitialWrapper = styled.div`
  animation: ${pop} 0.1s forwards ease-in-out;
  transition: 0.1s all ease-in-out;
`
const FullIcon = styled(InfoIcon)`
  min-width: 24px;
  height: 24px;
  margin-right: 12px;
`

const CloseIconContainer = styled.div`
  cursor: pointer;
  transition: 0.15s transform cubic-bezier(0.19, 1, 0.22, 1);
  outline: none;

  &:focus {
    transform: scale(0.9);
  }
`

const Wrapper = styled.div<{ disappering: boolean }>(
  ({ theme }) => `min-height: 100px;
  display: flex;
  padding: 16px;

  background: #000;
  color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(43, 45, 56, 0.04), 0px 1px 0px rgba(43, 45, 56, 0.04);
  transition: 0.1s all ease-in-out;
  opacity: 1;
  word-break: break-all;
`,
  ({ disappering }) =>
    disappering
      ? {
          marginTop: -132,
          opacity: 0,
        }
      : {}
)

export const Notification = ({
  notification: { text, type, isClosing, close, duration },
}: {
  notification: UINotification
}) => {
  const managedTimeout = useManagedTimeout(() => close(), duration)

  const stopPropagation = (event: React.MouseEvent<unknown>) => {
    // Stop escaping the event to avoid closing possibly open popovers
    event.stopPropagation()
  }

  const onXClicked = (event: React.MouseEvent<unknown>) => {
    close()
  }

  return (
    <InitialWrapper onClick={stopPropagation}>
      <Wrapper
        disappering={isClosing}
        onMouseEnter={managedTimeout.pause}
        onMouseLeave={managedTimeout.resume}
      >
        <FullIcon />
        <p color='white'>{text}</p>
        <div>
          <CloseIconContainer onClick={onXClicked} tabIndex={0}>
            X
          </CloseIconContainer>
        </div>
      </Wrapper>
    </InitialWrapper>
  )
}

export default Notification
