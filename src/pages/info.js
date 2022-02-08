import { useMetamask } from '../context/metamaskContext';
import Info from '../components/containers/info/Info'

export default function InfoPage() {
  const { ethereum, account, connect } = useMetamask();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Info account={account} />
}
