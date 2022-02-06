import Layout from '../components/containers/layout/Layout'
import '../styles/globals.scss'
import MetamaskProvider from '../context/metamaskContext'
import ModalProvider from '../components/containers/modal/Modal'
import UserContextProvider from '../context/userContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dwitter</title>
        <meta name="description" content="It's my NextJS Template Project" />
      </Head>

      <MetamaskProvider>
        <UserContextProvider>
          <ModalProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </UserContextProvider>
      </MetamaskProvider>
    </>
  )
}

export default MyApp
