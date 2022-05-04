import React from 'react'
import styled from '@emotion/styled'

import Notification from './Notification'
import { Flex } from '../externals'
import { useNotificationsManager } from '../hooks'

const AbsoluteWrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  max-width: 290px;
  display: flex;
  flex-direction: column;
  z-index: 999;
`

const NotificaitonsDisplayer = () => {
  const { notifications } = useNotificationsManager()
  return (
    <AbsoluteWrapper>
      {notifications.map(n => (
        <React.Fragment key={n.id}>
          <Notification notification={n} />
          <Flex basis={16} />
        </React.Fragment>
      ))}
    </AbsoluteWrapper>
  )
}

export { NotificaitonsDisplayer }
