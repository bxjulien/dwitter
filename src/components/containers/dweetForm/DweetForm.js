import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import styles from './DweetForm.module.scss';
import Image from 'next/image';

export default function dweetForm({ value, user, placeholder, onInput, postDweet, router }) {
  return (
    <div className={styles.dweetForm}>
      {user ?
        <>
          <Image className={styles.image} src={`/assets/profile_pictures/${user.picture}.svg`} width={35} height={35} />
          <div className={styles.input}>
            <Input value={value} name="dweet" limit="200" onInput={(name, value) => onInput(value)} placeholder={placeholder} />
          </div>
          <div className={styles.dweetButton} >
            <Button onClick={() => postDweet()} disabled={!value}>Dweet</Button>
          </div>
        </>
        :
        <div className={styles.noAccount}>
          <p className={styles.message}>Hi fren 👋, <br /> you'll need to create an account to push some new dweets here :)</p>
          <Button onClick={() => router.push('/profile')}>Let's go</Button>
        </div>
      }
    </div>
  )
}