import Header from '../header/Header';
import Footer from '../footer/Footer'
import styles from './Layout.module.scss';
import { Modal } from '../modal/Modal';

export default function Layout(props) {
  return (
    <div className={styles.layout}>
      <Modal>
        <header>
          <Header />
        </header>

        <main>
          {props.children}
        </main>

        <footer>
          <Footer />
        </footer>
      </Modal>
    </div>
  )
}