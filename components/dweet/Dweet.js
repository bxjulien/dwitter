import Address from '../address/Address'
import Button from '../button/Button';

const Dweet = ({ dweet, deleteDweetFn }) => {

  return (
    <>
      <Address address={dweet.user} />
      <p>{dweet.text}</p>
      <Button text={'Delete'} fn={() => deleteDweetFn(dweet.id)} />
    </>
  )
}

export default Dweet;