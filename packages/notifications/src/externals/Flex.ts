import * as React from 'react'
import styled from '@emotion/styled'

type GlobalCssValues = 'initial' | 'inherit' | 'unset'

type WrapValue = 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalCssValues

type JustifyValue =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | GlobalCssValues

type AlignValue =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'left'
  | 'right'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | GlobalCssValues

export interface Props {
  child?: boolean
  auto?: boolean
  none?: boolean
  column?: boolean
  reverse?: boolean
  justify?: JustifyValue
  align?: AlignValue
  wrap?: WrapValue
  className?: string
  grow?: number
  height?: number | string
  width?: number | string
  maxWidth?: number | string
  center?: boolean
  basis?: number | string
  onClick?: any
  children?: React.ReactNode
}

function castPixels(value: string | number) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

export const Flex: React.FC<Props> = styled.div<Props>`
  ${({ child }) => (!child ? `display: flex;` : '')}
  ${({ onClick }: Props) => (onClick ? 'cursor: pointer;' : '')};
  ${({ auto }) => (auto ? 'flex: 1 1 auto;' : '')};
  ${({ none }) => (none ? 'flex: 0 0 auto;' : '')};
  ${({ center }) => (center ? 'justify-content: center; align-items: center;' : '')};
  ${({ justify }) => (justify ? `justify-content: ${justify};` : '')};
  ${({ align }) => (align ? `align-items: ${align};` : '')};
  ${({ grow }) => (grow ? `flex-grow: ${grow};` : '')};
  ${({ wrap }) => (wrap ? `flex-wrap: ${wrap};` : '')};
  ${({ height }) => (height ? `height: ${castPixels(height)};` : '')};
  ${({ width }) => (width ? `width: ${castPixels(width)};` : '')};
  ${({ maxWidth }) => (maxWidth ? `max-width: ${castPixels(maxWidth)};` : '')};
  ${({ basis }) =>
    typeof basis !== 'undefined'
      ? `flex-basis: ${basis}${typeof basis === 'number' ? 'px' : ''};`
      : ''};
  flex-direction: ${({ column, reverse }) => {
    const postFix = reverse ? '-reverse' : ''
    return column ? `column${postFix}` : `row${postFix}`
  }};
`
