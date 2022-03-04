import styles from "./Address.module.scss";
import shortenAddress from '../../../utils/helpers/common/shortenAddress'

const Adrress = (props) => {

  return (
    <span className={styles.address}>
      {shortenAddress(props.children)}
    </span>
  )
}

export default Adrress;