import { useRouter } from 'next/router';
import Button from '../button/Button';
import styles from './Message.module.scss';

export default function Message({ route, fn, ethereum, firstPart, icon, secondPart, buttonText }) {
  const router = useRouter();

  function handleClick() {
    if (fn && ethereum) fn(ethereum)
    else if (route) router.push(route)
  }

  return (
    <div className={styles.message}>
      <div className={styles.text}>
        {firstPart} <span className={styles.icon}>{icon}</span>, <br />
        {secondPart}
      </div>
      {buttonText &&
        <Button onClick={() => handleClick()}>{buttonText}</Button>
      }
    </div>
  )
}