import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Button from '../../common/button/Button';
import styles from './Info.module.scss';

export default function Info({ ethereum, account, contract }) {
  const [state, setState] = useState({
    userBalance: null,
    isFaucetDisabled: true
  });


  return (
    <div className={styles.info}>

      <h1>Ethereum Faucet</h1>

      <p className={styles.description}>
        As Dwitter is hosted on the <span className={styles.network}>Rinkeby Testnet</span>, <br />
        we are not using real ETH here. <br />
      </p>

      <div className={styles.faucet}>
        <Button disabled={state.isFaucetDisabled}>
          {state.isFaucetDisabled ?
            'You have enough ETH 😏'
            :
            'Get some fake ETH 💸'
          }
        </Button>
      </div>
    </div>
  )
}