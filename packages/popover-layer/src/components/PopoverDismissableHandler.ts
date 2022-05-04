import React, { useEffect } from 'react'

export interface PopoverDismissableHandlerProps {
  animationDelay: number
  dismissing: boolean
  destroy: () => void
  // todo what is wrong with the types?
  children?: any
}

export const PopoverDismissableHandler = (props: PopoverDismissableHandlerProps) => {
  useEffect(() => {
    if (props.dismissing) {
      const timeout = setTimeout(() => props.destroy(), props.animationDelay || 250)

      return () => clearTimeout(timeout)
    }
  }, [props.dismissing])

  return props.children
}
