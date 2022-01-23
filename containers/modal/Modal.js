import { createContext, useState, useContext } from 'react';
import styles from './Modal.module.scss';
import Address from '../../components/address/Address'

const ModalContext = createContext();

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  function handleModal(v = null) {
    if (v) {
      console.log("modal data -> ", v)
      setData(v);
      setIsOpen(true);
    } else {
      setData(null);
      setIsOpen(false);
    }
  }

  const value = { handleModal }

  return (
    <ModalContext.Provider value={value}>
      {isOpen &&
        <div className={styles.modal}>
          <div className={styles.content}>
            <span onClick={() => setIsOpen(false)}>C</span>
            {data &&
            <div>
              <div className={styles.dweet}>
                <Address>{data.user}</Address>
                <span>{data.text}</span>
              </div>
              <div className={styles.reply}>
                  the reply
              </div>
            </div>
            }
          </div>
        </div>
      }

      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext);
}