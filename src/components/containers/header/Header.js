import styles from './Header.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image';

export default function Header() {
  const router = useRouter();

  const routes = [
    { route: '/', icon: 'home' },
    { route: '/profile', icon: 'account' },
    { route: '/faucet', icon: 'drop' }
  ]

  return (
    <div className={styles.header}>
      <ul>
        {
          routes.map((r, key) => {
            return (
              <li key={key} onClick={() => router.push(r.route)} className={router.pathname === r.route ? styles.active : undefined}>
                <Image className={styles.image} src={`/assets/icons/${r.icon}.png`} width={22} height={22} alt={r.icon} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}