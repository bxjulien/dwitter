import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BalanceTypes } from '../../../utils/enums/BalanceTypes';
import Button from '../../common/button/Button';
import styles from './Faucet.module.scss';

export default function Faucet({ ethereum, account, contract, user, balance }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [faucetBalance, setFaucetBalance] = useState(null);

  useEffect(() => getFaucetBalance(), []);

  function getFaucetBalance() {
    try {
      contract.getBalance().then(res => {
        const balance = ethers.utils.formatEther(res);
        console.log(balance)
        setFaucetBalance(balance)
      })
    }
    catch (e) { console.error(e) }
  }

  async function fillFaucet() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const tx = {
      chainId: "0x4",
      to: "0x69a1B8e2752fB015A2645d20E7cB29b231807F2f",
      value: ethers.utils.parseEther('0.01')
    }

    signer.sendTransaction(tx);
  }

  async function requestFaucet() {
    try {
       fetch('/api/faucet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: account }),
      }).then(res => {
        console.log(res)
      }) 
    }
    catch (e) { console.error(e) }
  }

  return (
    <div className={styles.faucet}>

      <h1>Ethereum Faucet</h1>

      <p>
        As Dwitter is hosted on the <strong className={styles.network}>Rinkeby Testnet</strong>, <br />
        we are not using real ETH here. <br />
      </p>

      <div className={styles.faucet}>
        <Button onClick={() => requestFaucet()} disabled={balance >= BalanceTypes.Enough} isButtonLoading={isButtonLoading}>
          {balance >= BalanceTypes.Enough ?
            'You have enough ETH 😏'
            :
            'Get 0.01 fake ETH 💸'
          }
        </Button>
      </div>

      <p className={styles.faucetBalance}>
        Current faucet balance : {faucetBalance} ETH
      </p>

      {
        balance >= BalanceTypes.Enough &&
        <div className={styles.fill}>
          <p>
            You can also fill the faucet to maintain Dwitter disponibility
          </p>
          <Button onClick={() => fillFaucet()} isButtonLoading={isButtonLoading}>
            Donate 0.01 ETH 🍼
          </Button>
        </div>
      }

    </div>
  )
}