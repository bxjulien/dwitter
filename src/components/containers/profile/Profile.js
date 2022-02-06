import { useState, useEffect } from 'react';
import { useUser } from '../../../context/userContext';
import Loader from '../../common/loader/Loader';
import User from '../user/User';
import UserForm from '../userForm/UserForm';
import styles from './Profile.module.scss';

export default function Profile({ account }) {
  const { contract, user, getUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className={styles.profile}>

      {isLoading ? <Loader />
        :
        (
          user && user.exists ?
            <User user={user} />
            :
            <UserForm contract={contract} account={account} setIsLoading={setIsLoading} getUser={getUser} />
        )}

    </section>
  )
}