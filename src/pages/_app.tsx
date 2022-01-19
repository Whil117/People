import HeadApp from '@Components/Head'
import Layout from '@Components/layout'
import AuthLayout from '@Components/layout/Auth'
import { persistor, store } from '@Redux/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '@Firebase/config'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthLayout {...{ router }}>
          <Layout {...{ router }}>
            <HeadApp />
            <Component {...pageProps} />
          </Layout>
        </AuthLayout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
