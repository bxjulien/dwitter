import Layout from '../containers/layout/Layout'
import '../styles/globals.css'
import MetamaskProvider from '../utils/helpers/ethers/metamask/metamaskProvider'

function MyApp({ Component, pageProps }) {
  return (
    <MetamaskProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MetamaskProvider>
  )
}

export default MyApp
