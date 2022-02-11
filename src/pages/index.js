import Dweets from '../components/containers/dweets/Dweets';
import { useMetamask } from '../context/metamaskContext';
import { useUser } from '../context/userContext';

export default function IndexPage() {
  const { ethereum, contracts, account, connect } = useMetamask();
  const { user, balance } = useUser();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Dweets contracts={contracts} ethereum={ethereum} account={account} user={user} balance={balance} />
}
