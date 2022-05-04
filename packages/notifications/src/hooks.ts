import { useCallback, useContext } from 'react'

import { ActionTypes, NotificationStore, NotificationType, UINotification } from './provider'

const ANIMATION_TIMEOUT = 100

// todo: is there a way we can prevent trigger re-rendering component after a new notification has been added?
export function useNotificationsManager() {
  const { state, dispatch } = useContext(NotificationStore)

  const forceRemoveNotification = useCallback(notification => {
    dispatch({
      type: ActionTypes.REMOVE,
      payload: notification,
    })
  }, [])

  // Remove allows to play all animation whilst force removes without any waiting.
  const removeNotification = useCallback(notification => {
    if (notification.isClosing) {
      return
    }

    dispatch({
      type: ActionTypes.UPDATE,
      payload: { ...notification, isClosing: true },
    })

    setTimeout(() => forceRemoveNotification(notification), ANIMATION_TIMEOUT)
  }, [])

  const addNotification = useCallback(
    (text, type: NotificationType = NotificationType.Success, duration = 3000) => {
      const notification: UINotification = {
        id: Math.random().toString(36),
        isClosing: false,
        text,
        type,
        duration,
        close: () => undefined,
      }

      // Helper to make controlled notification
      notification.close = () => removeNotification(notification)

      dispatch({
        type: ActionTypes.ADD,
        payload: notification,
      })

      return notification
    },
    []
  )

  const updateNotification = useCallback(notification => {
    dispatch({
      type: ActionTypes.UPDATE,
      payload: notification,
    })
  }, [])

  return {
    notifications: state,
    addNotification,
    removeNotification,
    updateNotification,
  }
}
