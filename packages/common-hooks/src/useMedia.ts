import useMediaExternal from 'use-media'

export enum MediaConstants {
  Xl = '(min-width: 1300px)',
  L = '(min-width: 920px)',
  M = '(min-width: 600px)',
}

export function useMedia(media: string | MediaConstants) {
  return useMediaExternal(media, true)
}
