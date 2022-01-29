import styles from './Header.module.scss'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <ul>
        <li onClick={() => router.push('/')}>
          <span>Home</span>
        </li>
        <li onClick={() => router.push('/profile')}>
          <span>Profile</span>
        </li>
      </ul>
    </div>
  )
}