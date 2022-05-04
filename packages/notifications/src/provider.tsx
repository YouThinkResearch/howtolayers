import React, { ReactChild } from 'react'

export const NotificationStore = React.createContext(null)

export enum ActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE',
}

export enum NotificationType {
  Success = 'success',
  Fail = 'fail',
}

export interface UINotification {
  id: any
  text: ReactChild
  type: NotificationType
  isClosing: boolean
  duration: number
  close(): void
}

interface IAction {
  payload?: any
  type: ActionTypes
}

const initialState = []

function reducer(state: [any], action: IAction) {
  // It has no use on non browser env
  if (typeof window === 'undefined') {
    console.warn(
      'It looks like you are using Notificati onManager which will have no effect if you call it from server. ' +
        '\nInstead, use useEffect to achieve notifications once the page is loaded.'
    )

    return state
  }

  switch (action.type) {
    case ActionTypes.ADD:
      return [...state, action.payload]
    case ActionTypes.UPDATE:
      return state.map(elm => {
        if (elm.id === action.payload.id) {
          return { ...elm, ...action.payload }
        }

        return elm
      })

    case ActionTypes.REMOVE:
      return state.filter(elem => elem.id !== action.payload.id)
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const context = { state, dispatch }
  return <NotificationStore.Provider value={context}>{props.children}</NotificationStore.Provider>
}

export default {
  StoreProvider,
  Store: NotificationStore,
  ActionTypes,
}
