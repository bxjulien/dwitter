import Address from '../address/Address'
import styles from './Dweet.module.scss'

export default function Dweet({ dweet, likeDweet, deleteDweet, handleReply, isMenu }) {
  return (
    <div className={styles.dweet}>
      <div className='flex-column'>
        <div className={styles.user}>
          <div className={styles.profile}></div>
          Username
          <Address>{dweet.user}</Address>
        </div>
        <p>{dweet.text}</p>
      </div>
      {isMenu &&
        <div className={styles.menu} >
          <span onClick={() => handleReply(dweet)}>↩️ {dweet.replies.length}</span>
          <span onClick={() => likeDweet(dweet.id)}>❤️ {dweet.likes.length}</span>
          <span onClick={() => deleteDweet(dweet.id)}>🗑️</span>
        </div>
      }
    </div>
  )
}