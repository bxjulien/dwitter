import getContract from '../utils/helpers/ethers/getContract';
import { useMetamask } from '../components/containers/metamask/metamaskProvider';

export default function Profile() {
  const { ethereum, account, connect } = useMetamask();

  const dwitterContract = getContract(ethereum);

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <p>Profile</p>
}
