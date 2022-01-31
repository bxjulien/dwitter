import getContract from '../utils/helpers/ethers/getContract';
import { useMetamask } from '../components/containers/metamask/metamaskProvider';
import Profile from '../components/containers/profile/Profile'

export default function UserProfile() {
  const { ethereum, account, connect } = useMetamask();

  const dwittosContract = getContract(ethereum, 'Dwittos');

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Profile contract={dwittosContract} account={account} />
}
