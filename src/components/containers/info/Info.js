import styles from './Info.module.scss';

export default function Info() {
  return (
    <div className={styles.info}>
      <p>This dApp is deployed on the Ethereum Rinkeby Testnet</p>
      <p>It meens you don't have to use real ETH to interact here :)</p>
      <p>blablabla</p>
    </div>
  )
}