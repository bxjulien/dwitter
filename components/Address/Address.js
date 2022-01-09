import styles from "./Address.module.css";
import shortenAddress from '../../utils/helpers/common/shortenAddress'

const Adrress = ({ address }) => {

  return (
    <span className={styles.address}>
      {shortenAddress(address)}
    </span>
  )
}

export default Adrress;