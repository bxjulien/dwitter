import { useMetamask } from '../context/metamaskContext';
import Profile from '../components/containers/profile/Profile'
import { useUser } from '../context/userContext';

export default function ProfilePage() {
  const { ethereum, contracts, account, connect } = useMetamask();
  const { user, balance, getUser } = useUser();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Profile account={account} contract={contracts.dwittos} user={user} balance={balance} getUser={getUser} />
}
