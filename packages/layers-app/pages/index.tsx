import type { NextPage } from 'next'
import Head from 'next/head'
import { LayersPage } from '@howtolayers/layers-example-page'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayersPage />
    </div>
  )
}

export default Home
