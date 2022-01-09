import Header from '../header/Header';
import Footer from '../footer/Footer'
import styles from './Layout.module.scss';

export default function Layout(props) {
  return (
    <div className={styles.layout}>
      <header>
        <Header />
      </header>

      <main>
        {props.children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}