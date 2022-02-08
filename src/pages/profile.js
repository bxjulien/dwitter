import { useMetamask } from '../context/metamaskContext';
import Profile from '../components/containers/profile/Profile'

export default function ProfilePage() {
  const { ethereum, account, connect } = useMetamask();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Profile account={account} />
}
