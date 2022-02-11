import { useMetamask } from '../context/metamaskContext';
import Info from '../components/containers/info/Info'
import { useUser } from '../context/userContext';

export default function InfoPage() {
  const { ethereum, contracts, account, connect } = useMetamask();
  const { user, balance } = useUser();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Info account={account} ethereum={ethereum} contract={contracts.faucet} user={user} balance={balance} />
}
