import { createContext, useState, useContext } from 'react';
import Reply from '../reply/Reply';
import styles from './Modal.module.scss';

const ModalContext = createContext();

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  function handleModal(v = null) {
    if (v) {
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
        <div className={styles.modal} onClick={() => handleModal()}>
          <div className={styles.content} onClick={e => e.stopPropagation()}>
          {data &&
            <Reply dweet={data} closeModal={handleModal} />
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