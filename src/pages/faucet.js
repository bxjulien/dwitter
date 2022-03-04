import { useMetamask } from '../context/metamaskContext';
import Faucet from '../components/containers/faucet/Faucet'
import { useUser } from '../context/userContext';
import Message from '../components/common/message/Message';
import switchNetwork from '../utils/helpers/ethers/switchNetwork';

export default function InfoPage() {
  const { ethereum, contracts, account, connect, isWrongNetwork } = useMetamask();
  const { user, balance } = useUser();

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>

  else if (!account) return <p>Connect with Metamask</p>

  else if (isWrongNetwork) return <Message fn={() => switchNetwork(ethereum)} firstPart={'Oops'} icon={'🔀'} secondPart={"Dwitter is hosted on the Rinkeby Tesnet"} buttonText={'Switch Network'} />
  
  else return <Faucet account={account} ethereum={ethereum} contract={contracts.faucet} user={user} balance={balance} />
}
