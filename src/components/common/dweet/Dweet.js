import Address from '../Address/Address';
import styles from './Dweet.module.scss';
import Image from 'next/image';
import Icon from '../icon/Icon';

export default function Dweet({ dweet, user, likeDweet, deleteDweet, sendTip, handleReply, routing, isMenu, isBorder, noBackground }) {
  const connectTooltip = "Connect to interact";

  return (
    <div className={`${styles.dweet} ${(!isBorder && styles.noBorder)} ${noBackground && styles.noBackground}`}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
          <div className={styles.imageUsernameAddress}>
            <Image className={styles.image} src={`/assets/profile_pictures/${dweet.picture}.svg`} width={35} height={35} alt="Profile Picture" />
            <div className={styles.texts}>
              <span>{dweet.username}</span>
              <Address>{dweet.user}</Address>
            </div>
          </div>
          <span className={styles.date}>{dweet.timestamp.toLocaleString('en-GB')}</span>
        </div>
        <p onClick={() => routing(dweet.id)} className={styles.text}>{dweet.text}</p>
      </div>
      {isMenu &&
        <div className={styles.menu}>
          <Icon icon={'↩️'} onClickFn={() => handleReply(dweet)} info={dweet.replies} tooltip={!user ? connectTooltip : 'Reply'} />

          <Icon icon={'❤️'} onClickFn={() => likeDweet(dweet.id)} info={dweet.likes.length} tooltip={!user ? connectTooltip : 'Like'} />

          {
            user && user.addr === dweet.user
              ?
              <Icon icon={'🗑️'} onClickFn={() => deleteDweet(dweet.id)} tooltip={!user ? connectTooltip : 'Delete'} />
              :
              <Icon onClickFn={() => sendTip(dweet.user)} icon={'💰'} tooltip={!user ? connectTooltip : 'Tip 0.001 ETH'} />
          }
        </div>
      }
    </div>
  )
}


