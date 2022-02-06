import Address from '../Address/Address';
import styles from './Dweet.module.scss';
import Image from 'next/image';

export default function Dweet({ dweet, likeDweet, deleteDweet, handleReply, routing, isMenu, isBorder }) {
  return (
    <div className={styles.dweet + (isBorder ? '' : ' ' + styles.noBorder)}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
        <Image className={styles.image} src={`/assets/profile_pictures/${dweet.picture}.svg`} width={35} height={35} />
          {dweet.username}
          <Address>{dweet.user}</Address>
        </div>
        <p onClick={() => routing(dweet.id)} className={styles.text}>{dweet.text}</p>
      </div>
      {isMenu &&
        <div className={styles.menu} >
          <span onClick={() => handleReply(dweet)}>↩️ {dweet.replies}</span>
          <span onClick={() => likeDweet(dweet.id)}>❤️ {dweet.likes.length}</span>
          <span onClick={() => deleteDweet(dweet.id)}>🗑️</span>
        </div>
      }
    </div>
  )
}