import { useState, useEffect } from 'react';
import { useUser } from '../../../context/userContext';
import Loader from '../../common/loader/Loader';
import User from '../user/User';
import UserForm from '../userForm/UserForm';
import styles from './Profile.module.scss';
import { BalanceTypes } from '../../../utils/enums/BalanceTypes';
import Message from '../../common/message/Message';

export default function Profile({ account, contract, user, balance, getUser }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className={styles.profile}>

      <h1>Profile</h1>

      {isLoading ? <Loader />
        :
        (
          user && user.exists ?
            <User user={user} />
            :
            (
              balance >= BalanceTypes.Enough ?
                <UserForm contract={contract} account={account} setIsLoading={setIsLoading} getUser={getUser} />
                :
                <Message route={'/info'} firstPart={'Oops'} icon={'😲'} secondPart={"you have not enough ETH to create your profile"} buttonText={'Go get some'} />
            )
        )}
    </section>
  )
}