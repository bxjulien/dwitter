import { useState, useEffect } from 'react'
import Image from 'next/image'
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import styles from './UserForm.module.scss';

export default function UserForm({ contract, account, setIsLoading, getUser }) {
  const [canSave, setCanSave] = useState(false);
  const [state, setState] = useState({
    username: '',
    bio: '',
    picture: ''
  });

  const pictures = ['btc', 'eth', 'atom', 'bnb', 'link', 'usdc', 'usdt'];

  useEffect(() => {
    setCanSave(checkForChanges());
  }, [state])

  function onInput(name, value) {
    setState({
      ...state,
      [name]: value
    });
  }

  function checkForChanges() {
    if (state.username.length && state.bio.length && state.picture.length) return true;
    else return false;
  }

  async function saveUser() {
    if (canSave) {
      try {
        const tx = await contract.postUser(state.username, state.bio, state.picture);
        setIsLoading(true);
        await tx.wait();
        getUser();
        setIsLoading(false);
      }
      catch (e) { console.error(e) }
    }
  }

  return (
    <div className={styles.form}>

      <div className={styles.input}>
        <Input value={state.username} label="Username" name="username" limit='12' onInput={onInput} />
      </div>

      <div className={styles.input}>
        <Input value={state.bio} label="Bio" name="bio" limit="40" onInput={onInput} />
      </div>

      <div className={styles.pictures}>
        <p>Profile picture</p>
        <div className={styles.container}>
          {pictures.map((p, key) => {
            return (
              <div key={key} onClick={() => onInput('picture', p)} className={`${styles.picture} ${(p === state.picture ? styles.active : '')}`}>
                <Image className={styles.image} src={`/assets/profile_pictures/${p}.svg`} width={35} height={35} alt="profile" />
              </div>
            )
          })}
        </div>

      </div>

      <Button disabled={!canSave} onClick={() => saveUser()}>Save</Button>

    </div>
  )
}