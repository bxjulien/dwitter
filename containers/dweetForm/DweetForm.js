import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import styles from './DweetForm.module.scss'

export default function dweetForm(props) {
  return (
    <div className={styles.dweetForm}>
      <div className={styles.profile}></div>
      <Input value={props.value} onInput={props.onInput} placeholder={props.placeholder} />
      <Button onClick={() => props.postDweet()} disabled={!props.value}>{props.postText}</Button>
    </div>
  )
}