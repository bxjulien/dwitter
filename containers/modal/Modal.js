import { useState } from 'react';
import styles from './Modal.module.scss';

export function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {isOpen &&
        <div className={styles.modal} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.content}>
            je suis la modal
          </div>
        </div>
      }

      {props.children}
    </>
  )
}