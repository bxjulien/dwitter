import Address from '../address/Address'
import styles from './Dweet.module.scss'

export default function Dweet({ dweet, likeDweet, deleteDweet, handleReply }) {  
  return (
    <div className={styles.dweet}>
      <div className='flex-column'>
        <Address address={dweet.user} />
        <p>{dweet.text}</p>
      </div>
      <div className={styles.menu}>
        <span onClick={() => handleReply(dweet)}>↩️ {dweet.replies.length}</span>
        <span onClick={() => likeDweet(dweet.id)}>❤️ {dweet.likes.length}</span>
        <span onClick={() => deleteDweet(dweet.id)}>🗑️</span>
      </div>
    </div>
  )
}