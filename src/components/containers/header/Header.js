import styles from './Header.module.scss'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <p onClick={() => router.push('/')}>Home</p>
      <p onClick={() => router.push('/profile')}>Profile</p>
    </div>
  )
}