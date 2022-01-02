const Dweet = ({ dweet }) => {

  return (
    <>
      <span>{dweet.user}</span>
      <p>{dweet.text}</p>
    </>
  )
}

export default Dweet;