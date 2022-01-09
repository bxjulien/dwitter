import styles from './Input.module.scss';

export default function Input(props) {
  return (
    <input
      {...props}
      className={styles.input}
      onInput={(e) => props.onInput(e.target.value)}
    />
  )
}