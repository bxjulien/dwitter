import styles from "./Button.module.css";

const Button = ({ text, fn }) => {

  return (
    <button className={styles.button} onClick={fn}>
      {text}
    </button>
  )
}

export default Button;