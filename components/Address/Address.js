import styles from "./Address.module.css";

const Adrress = ({ address }) => {

  return <span className={styles.address}>{`${address.slice(0, 5)}...${address.slice(address.length - 4)}`}</span>
}

export default Adrress;