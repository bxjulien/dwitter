import Layout from '../containers/layout/Layout'
import '../styles/globals.css'
import MetamaskProvider from '../utils/helpers/ethers/metamask/metamaskProvider'
import ModalProvider from '../containers/modal/Modal'

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
