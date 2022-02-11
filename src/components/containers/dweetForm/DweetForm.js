import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import styles from './DweetForm.module.scss';
import Image from 'next/image';
import { BalanceTypes } from '../../../utils/enums/BalanceTypes';
import Message from '../../common/message/Message';

export default function dweetForm({ value, user, balance, placeholder, onInput, postDweet }) {
  return (
    <div className={styles.dweetForm}>
      {user ?
        (balance >= BalanceTypes.Enough ?
          <>
            <Image className={styles.image} src={`/assets/profile_pictures/${user.picture}.svg`} width={35} height={35} alt="Profile" />
            <div className={styles.input}>
              <Input value={value} name="dweet" limit="200" onInput={(name, value) => onInput(value)} placeholder={placeholder} />
            </div>
            <div className={styles.dweetButton} >
              <Button onClick={() => postDweet()} disabled={!value}>Dweet</Button>
            </div>
          </>
          :
          <Message route={'/info'} firstPart={'Oops'} icon={'😲'} secondPart={"you have not enough ETH to create your profile"} buttonText={'Go get some'} />
        )
        :
        <Message route={balance >= BalanceTypes.Enough ? '/profile' : '/info'} firstPart={'Hi fren'} icon={'👋'} secondPart={"you'll need to create an account to push some new dweets here :)"} buttonText={"Let's go !"} />
      }
    </div>
  )
}