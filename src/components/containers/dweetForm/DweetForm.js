import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import styles from './DweetForm.module.scss'

export default function dweetForm(props) {
  return (
    <div className={styles.dweetForm}>
      <div className={styles.profile}></div>
      <div className={styles.input}>
        <Input value={props.value} name="dweet" limit="200" onInput={(name, value) => props.onInput(value)} placeholder={props.placeholder} />
      </div>
      <Button onClick={() => props.postDweet()} disabled={!props.value}>Dweet</Button>
    </div>
  )
}