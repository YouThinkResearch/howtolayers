import styled from '@emotion/styled'

export const ModalOuterContainer = styled.div<{ mobile: boolean; zIndex: number; height?: string }>`
  z-index: ${({ zIndex }) => zIndex || 1};
  position: fixed;
  ${({ height }) => `height: ${height || '100vh'};`}
  margin-top: ${({ zIndex }) => (zIndex - 1) * 2}px;

  ${({ mobile, height, zIndex }) =>
    mobile
      ? `
    position: fixed;
    max-height: calc(var(--1dvh, 1vh) * 100 - ${80 + zIndex * 2}px);
    bottom: 0;
    width: 100%;
    height: 100vh;
  `
      : `
  transform: translate(-50%, -50%) translate3d(0px, 0px, 0px);
  inset: 50% auto auto 50%;

  `}
`
