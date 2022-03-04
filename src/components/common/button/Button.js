import Loader from "../loader/Loader";
import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button onClick={props.onClick} className={`${styles.button} ${!props.disabled && styles.active}`}>
      {props.isButtonLoading ? <Loader isButton={true} /> : props.children}
    </button>
  )
}