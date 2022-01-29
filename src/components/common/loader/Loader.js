import styles from './Loader.module.scss'

export default function Loader() {

  return (
    <div className={styles.container}>
      <div className={styles.loader + ' ' + styles.triangle}>
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
    </div>
  )
}

