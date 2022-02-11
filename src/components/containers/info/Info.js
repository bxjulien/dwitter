import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BalanceTypes } from '../../../utils/enums/BalanceTypes';
import Button from '../../common/button/Button';
import styles from './Info.module.scss';

export default function Info({ ethereum, account, contract, user, balance }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  async function requestFaucet() {
    try {
      const tx = await contracts.faucet.get();
      setIsButtonLoading(true);
      await tx.wait();
      setIsButtonLoading(false);
    }
    catch (e) { console.error(e) }
  }

  return (
    <div className={styles.info}>

      <h1>Ethereum Faucet</h1>

      <p className={styles.description}>
        As Dwitter is hosted on the <span className={styles.network}>Rinkeby Testnet</span>, <br />
        we are not using real ETH here. <br />
      </p>

      <div className={styles.faucet}>
        <Button onClick={() => requestFaucet()} disabled={!balance >= BalanceTypes.Enough} isLoading={true}>
          {balance >= BalanceTypes.Enough ?
            'You have enough ETH 😏'
            :
            'Get some fake ETH 💸'
          }
        </Button>
      </div>
    </div>
  )
}