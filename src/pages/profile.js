import { useMetamask } from '../context/metamaskContext';
import Profile from '../components/containers/profile/Profile'
import { useUser } from '../context/userContext';
import Message from '../components/common/message/Message';
import switchNetwork from '../utils/helpers/ethers/switchNetwork';

export default function ProfilePage() {
  const { ethereum, contracts, account, connect, isWrongNetwork } = useMetamask();
  const { user, balance, getUser } = useUser();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>

  else if (!account) return <p>Connect with Metamask</p>

  else if (isWrongNetwork) return <Message fn={() => switchNetwork(ethereum)} firstPart={'Oops'} icon={'🔀'} secondPart={"Dwitter is hosted on the Rinkeby Tesnet"} buttonText={'Switch Network'} />
  
  else return <Profile account={account} contract={contracts.dwittos} user={user} balance={balance} getUser={getUser} />
}
