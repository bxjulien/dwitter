import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>Top navbar</div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
