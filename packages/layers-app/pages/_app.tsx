import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import './reset.css'

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    <Component {...pageProps} />
  </CacheProvider>
)

export default App