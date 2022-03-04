import styles from './Loader.module.scss'

export default function Loader(props) {

  return (
    <div className={styles.container}>
      {!props.isButton ?
        <div className={styles.loader + ' ' + styles.triangle}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>
        :
        <div className={styles.loader + ' ' + styles.triangle}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>
      }
    </div>
  )
}

