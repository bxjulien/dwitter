import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button {...props} className={`${styles.button} ${!props.disabled && styles.active}`}>
      {props.children}
    </button>
  )
}