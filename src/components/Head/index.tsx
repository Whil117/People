/* eslint-disable @next/next/no-page-custom-font */
import { FC } from 'react'
import Head from 'next/head'
import { Global } from '@emotion/react'
import Normalize from '@Styles/global/normalize'
const HeadApp: FC = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global styles={Normalize} />
      {children}
    </>
  )
}

export default HeadApp
