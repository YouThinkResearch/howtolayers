import React, { useEffect } from 'react'

import { useNotificationsManager } from './hooks'
import { NotificationType } from './provider'

const debug = require('debug')('app/common/notifications/useApolloErrorHandler')

export function useApolloErrorHandler(error: Error | null, action: string) {
  const notificationsManager = useNotificationsManager()

  useEffect(() => {
    if (!error || !error.message) {
      return
    }

    debug(`Caught Apollo error: `, error)
    let message = error.message.replace('GraphQL error: ', '')

    try {
      message = (error as any).networkError.result.errors[0].message
    } catch (e) {}

    notificationsManager.addNotification(
      <>
        <p>{action}</p>
        <p>
          <i>{message}</i>
        </p>
      </>,
      NotificationType.Fail
    )
  }, [error])
}
