import { useState } from 'react';
import styles from './Input.module.scss';

export default function Input(props) {
  const [focus, setFocus] = useState(false);
  const [isLabelStuck, setIsLabelStuck] = useState(false);
  const [value, setValue] = useState('')

  function onInput(name, input) {
    if (props.limit && input.length > props.limit) return
    props.onInput(name, input);
    if (input && input.length > 0) setIsLabelStuck(true);
    else setIsLabelStuck(false);
    setValue(input);
  }

  return (
    <div onFocus={() => setFocus(true)} onBlur={() => setFocus(isLabelStuck ? true : false)} className={styles.container}>
      {props.label && <label onClick={() => setFocus(true)} className={styles.label + ' ' + (focus ? styles.focused : '')}>{props.label}</label>}
      <input
        {...props}
        autoComplete="off"
        className={styles.input + ' ' + (focus ? styles.bordered : '')}
        name={props.name}
        onInput={(e) => onInput(e.target.name, e.target.value)}
      />
      {props.limit && <small className={styles.limit}>{value.length}/{props.limit}</small>}
    </div>
  )
}