import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.texts}>
        <h1 className={styles.dwitter}>Dwitter</h1>
        <p className={styles.slogan}>twitter, but Decentralized.</p>
      </div>
    </div>
  )
}