import { createContext, useState, useContext } from 'react';
import styles from './Modal.module.scss';

const ModalContext = createContext();

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  function handleModal(v) {
    setData(v);
    setIsOpen(true);
  }

  const value = { handleModal }

  return (
    <ModalContext.Provider value={value}>
      {isOpen &&
        <div className={styles.modal} onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen) }}>
          <div className={styles.content}>
            {data && <div>{data}</div>}
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