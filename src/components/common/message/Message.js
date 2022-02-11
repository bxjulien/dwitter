import { useRouter } from 'next/router';
import Button from '../button/Button';
import styles from './Message.module.scss';

export default function Message({ route, firstPart, icon, secondPart, buttonText }) {
    const router = useRouter();
    return (
        <div className={styles.message}>
            <div className={styles.text}>
                {firstPart} <span className={styles.icon}>{icon}</span>, <br />
                {secondPart}
            </div>
            <Button onClick={() => router.push(route)}>{buttonText}</Button>
        </div>
    )
}