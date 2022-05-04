import styled from '@emotion/styled'

export const PopoverOuterContainer = styled.div<{
  mobile: boolean
  zIndex: number
  height?: string
}>`
  z-index: ${({ zIndex }) => zIndex || 1};
  position: absolute;
  right: 0;

  ${({ mobile, height }) =>
    mobile
      ? `
    position: fixed;
    max-height: calc(var(--1dvh, 1vh) * 100 - 80px);
    height: ${height || '100vh'};
    width: 100vw;
    bottom: 0;
  `
      : 'margin-top: 10px;'}
`
