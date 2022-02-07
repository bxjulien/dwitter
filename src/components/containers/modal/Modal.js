import { createContext, useState, useContext } from 'react';
import { ModalTypes } from '../../../utils/enums/ModalTypes';
import Reply from '../reply/Reply';
import styles from './Modal.module.scss';

const ModalContext = createContext();

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);

  function handleModal(modalType = null, data = null) {
    if (modalType && data) {
      setState({ modalType, data });
      setIsOpen(true);
    } else {
      setState(null);
      setIsOpen(false);
    }
  }

  const value = { handleModal }

  return (
    <ModalContext.Provider value={value}>
      {isOpen &&
        <div className={styles.modal} onClick={() => handleModal()}>
          <div className={styles.content} onClick={e => e.stopPropagation()}>
            {state &&
              (
                state.modalType === ModalTypes.Reply &&
                <Reply dweet={state.data.dweet} user={state.data.user} closeModal={handleModal} />
              )
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