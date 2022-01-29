import Layout from '../components/containers/layout/Layout'
import '../styles/globals.scss'
import MetamaskProvider from '../components/containers/metamask/metamaskProvider'
import ModalProvider from '../components/containers/modal/Modal'

function MyApp({ Component, pageProps }) {
  return (
    <MetamaskProvider>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </MetamaskProvider>
  )
}

export default MyApp
