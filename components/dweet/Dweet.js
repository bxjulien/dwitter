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
        <Button text="Like" fn={() => likeDweet(dweet.id)} />
        <Button text="Delete" fn={() => deleteDweet(dweet.id)} />
      </div>
    </div>
  )
}

export default Dweet;