import styles from './Header.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image';

export default function Header() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <ul>
        <li onClick={() => router.push('/')} className={router.pathname === "/" ? styles.active : ''}>
          <Image className={styles.image} src={`/assets/icons/home.png`} width={22} height={22} />
        </li>
        <li onClick={() => router.push('/profile')} className={router.pathname === "/profile" ? styles.active : ''}>
          <Image className={styles.image} src={`/assets/icons/account.png`} width={22} height={22} />
        </li>
      </ul>
    </div>
  )
}