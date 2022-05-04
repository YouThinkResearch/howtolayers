import { useEffect, useState } from 'react'

export function useManagedTimeout(callback: any, wait = 5000, deps: any[] = []) {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      return () => {}
    }

    const newTimeout = setTimeout(callback, wait)

    return () => clearTimeout(newTimeout)
  }, [...deps, paused])

  return {
    pause: () => !paused && setPaused(true),
    resume: () => paused && setPaused(false),
    paused,
  }
}
