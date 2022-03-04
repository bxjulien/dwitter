import Message from '../components/common/message/Message';
import Dweets from '../components/containers/dweets/Dweets';
import { useMetamask } from '../context/metamaskContext';
import { useUser } from '../context/userContext';
import switchNetwork from '../utils/helpers/ethers/switchNetwork';

export default function IndexPage() {
  const { ethereum, contracts, account, isWrongNetwork } = useMetamask();
  const { user, balance } = useUser();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>

  else if (!account) return <p>Connect with Metamask</p>

  else if (isWrongNetwork) return <Message fn={switchNetwork} ethereum={ethereum} firstPart={'Oops'} icon={'🔀'} secondPart={"Dwitter is hosted on the Rinkeby Tesnet"} buttonText={'Switch Network'} />

  else return <Dweets contracts={contracts} ethereum={ethereum} account={account} user={user} balance={balance} />
}
