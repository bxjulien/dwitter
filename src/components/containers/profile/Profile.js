import { useState, useEffect } from 'react';
import Loader from '../../common/loader/Loader';
import UserForm from '../userForm/UserForm';
import styles from './Profile.module.scss';

export default function Profile({ contract, account }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreation, setIsCreation] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      setIsLoading(true);
      const user = await contract.getUser(account);

      console.log(user)

      if (user.exists) {
        const newUser = {
          id: +user.id,
          addr: user.addr,
          name: user.name,
          username: user.username,
          color: +user.color,
          picture: +user.picture,
          exists: user.exists
        }

        setUser(newUser);
        setIsLoading(false);
      } else {
        setIsCreation(true);
        setIsLoading(false);
      }
    }
    catch (e) { console.error(e); }
  }

  function renderProfile() {
    if (isCreation) {
      return <UserForm />
    } else {
      return "user"
    }
  }

  return (
    <section className={styles.profile}>

      {isLoading ? <Loader /> : renderProfile()}

    </section>
  )
}