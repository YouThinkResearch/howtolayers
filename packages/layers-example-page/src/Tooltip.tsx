import styled from '@emotion/styled'
import { MediaConstants, useMedia } from '@howtolayers/common-hooks'
import {
  PopoverDismissableHandler,
  PopoverInnerContainer,
  UiPopover,
} from '@howtolayers/popover-layer'

import { ReactElement, ReactNode, useCallback, useState } from 'react'
import tw from 'twin.macro'

const TooltipContainer = styled.div`
  width: max-content;
  position: relative;
`

const TooltipTrigger = styled.div`
  width: max-content;
`

const InnerContainer = styled.div`
  ${tw`px-2 py-2 `}
`

export interface TooltipProps {
  content: () => ReactElement
  children: ReactNode
}

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
  const isMobile = !useMedia(MediaConstants.M)
  const triggerType: any = isMobile ? 'click' : 'hover'
  const [visible, setVisible] = useState(false)

  const mouseEventHandler = (next: boolean) =>
    useCallback(() => {
      if (triggerType === 'hover' && visible !== next) {
        setVisible(next)
      }
    }, [triggerType, visible])

  const clickEventHandler = useCallback(() => {
    if (triggerType === 'click') {
      setVisible(prev => !prev)
    }
  }, [triggerType])

  return (
    <TooltipContainer>
      <TooltipTrigger
        role='button'
        tabIndex={-1}
        onClick={clickEventHandler}
        onKeyUp={mouseEventHandler(true)}
        onMouseEnter={mouseEventHandler(true)}
        onMouseLeave={mouseEventHandler(false)}
        onFocus={mouseEventHandler(true)}
        onBlur={mouseEventHandler(false)}
      >
        {props.children}
      </TooltipTrigger>

      <UiPopover opened={visible} onClosed={() => setVisible(false)}>
        {layerProps => (
          <PopoverDismissableHandler animationDelay={250} {...layerProps}>
            <PopoverInnerContainer dismissing={layerProps.dismissing}>
              {props.content()}
            </PopoverInnerContainer>
          </PopoverDismissableHandler>
        )}
      </UiPopover>
    </TooltipContainer>
  )
}
