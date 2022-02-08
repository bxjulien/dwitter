import Address from '../Address/Address';
import styles from './Dweet.module.scss';
import Image from 'next/image';
import Icon from '../icon/Icon';

export default function Dweet({ dweet, user, likeDweet, deleteDweet, sendTip, handleReply, routing, isMenu, isBorder, noBackground }) {
  return (
    <div className={`${styles.dweet} ${(!isBorder && styles.noBorder)} ${noBackground && styles.noBackground}`}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
          <Image className={styles.image} src={`/assets/profile_pictures/${dweet.picture}.svg`} width={35} height={35} />
          <div className={styles.texts}>
            {dweet.username}
            <Address>{dweet.user}</Address>
            <span className={styles.date}>{dweet.timestamp.toLocaleString('en-GB')}</span>
          </div>
        </div>
        <p onClick={() => routing(dweet.id)} className={styles.text}>{dweet.text}</p>
      </div>
      {isMenu &&
        <div className={styles.menu}>
          <Icon icon={'↩️'} onClickFn={() => handleReply(dweet)} info={dweet.replies} tooltip="Reply" />

          <Icon icon={'❤️'} onClickFn={() => likeDweet(dweet.id)} info={dweet.likes.length} tooltip="Like" />

          {
            dweet.user === user.addr
              ?
              <Icon icon={'🗑️'} onClickFn={() => deleteDweet(dweet.id)} tooltip="Delete" />
              :
              <Icon onClickFn={() => sendTip(dweet.user)} icon={'💰'} tooltip="Tip 0.001 ETH" />
          }
        </div>
      }
    </div>
  )
}


