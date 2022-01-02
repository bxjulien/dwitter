import Address from './Address/Address'

const Dweet = ({ dweet }) => {

  return (
    <>
      <Address address={dweet.user} />
      <p>{dweet.text}</p>
    </>
  )
}

export default Dweet;