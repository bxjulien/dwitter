import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import styles from './DweetForm.module.scss';
import Image from 'next/image';

export default function dweetForm(props) {
  return (
    <div className={styles.dweetForm}>
      {props.user ?
        <>
          <Image className={styles.image} src={`/assets/profile_pictures/${props.user.picture}.svg`} width={35} height={35} />
          <div className={styles.input}>
            <Input value={props.value} name="dweet" limit="200" onInput={(name, value) => props.onInput(value)} placeholder={props.placeholder} />
          </div>
          <Button className={styles.dweetButton} onClick={() => props.postDweet()} disabled={!props.value}>Dweet</Button>
        </>
        :
        <div className={styles.noAccount}>
          <p className={styles.message}>Hi fren 👋, <br /> you'll need to create an account to push some new dweets here :)</p>
          <Button onClick={() => props.router.push('/profile')}>Let's go</Button>
        </div>
      }
    </div>
  )
}