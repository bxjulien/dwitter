import Address from '../address/Address'
import Button from '../button/Button'
import styles from './Dweet.module.css'

const Dweet = ({ dweet, likeDweet, deleteDweet }) => {

  return (
    <div className={styles.dweet}>
      <Address address={dweet.user} />
      <p>{dweet.text}</p>
      <Button text="Like" fn={() => likeDweet(dweet.id)} />
      <Button text="Delete" fn={() => deleteDweet(dweet.id)} />
    </div>
  )
}

export default Dweet;