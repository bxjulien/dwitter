import Address from '../address/Address'
import Button from '../button/Button'
import styles from './Dweet.module.css'

const Dweet = ({ dweet, likeDweet, deleteDweet }) => {
  return (
    <div className={styles.dweet}>
      <div className='flex-column'>
        <Address address={dweet.user} />
        <p>{dweet.text}</p>
        <span className={styles.likes + ' flex-row'}>{dweet.likes.length} ❤️</span>
      </div>
      <div className='flex-row'>
        <Button onClick={() => likeDweet(dweet.id)}>Like</Button>
        <Button onClick={() => deleteDweet(dweet.id)}>Delete</Button>
      </div>
    </div>
  )
}

export default Dweet;