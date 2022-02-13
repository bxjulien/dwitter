import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BalanceTypes } from '../../../utils/enums/BalanceTypes';
import Button from '../../common/button/Button';
import styles from './Info.module.scss';

export default function Info({ ethereum, account, contract, user, balance }) {
  const [isRequestButtonLoading, setIsRequestButtonLoading] = useState(false);
  const [isFillButtonLoading, setIsFillButtonLoading] = useState(false);

  useEffect(() => getFaucet(), [])

  async function getFaucet() {
    try {
      const tx = await contract.get();
      await tx.wait();
    }
    catch (e) { console.error(e) }
  }

  async function requestFaucet() {
    try {
      const tx = await contract.request();
      setIsRequestButtonLoading(true);
      await tx.wait();
      setIsRequestButtonLoading(false);
    }
    catch (e) { console.error(e) }
  }

  async function fillFaucet() {
    console.log("lol")
    try {
      const tx = await contract.receive(ethers.utils.parseEther('0.01'));
      setIsFillButtonLoading(true);
      await tx.wait();
      setIsFillButtonLoading(false);
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
        <Button onClick={() => requestFaucet()} disabled={balance >= BalanceTypes.Enough} isLoading={isRequestButtonLoading}>
          {balance >= BalanceTypes.Enough ?
            'You have enough ETH 😏'
            :
            'Get some fake ETH 💸'
          }
        </Button>
        {balance >= BalanceTypes.Enough &&
          <Button onClick={() => fillFaucet()} isLoading={isFillButtonLoading}>
            Fill the faucet with 0.01 ETH
          </Button>
        }
      </div>
    </div>
  )
}