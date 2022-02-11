import Loader from "../loader/Loader";
import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button {...props} className={`${styles.button} ${!props.disabled && styles.active}`}>
      {props.isLoading ? <Loader isButton={true} /> : props.children}
    </button>
  )
}