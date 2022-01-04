const Input = ({ value, onInput }) => {

  return (
    <input value={value} onInput={e => onInput(e.target.value)} />
  )
}

export default Input;