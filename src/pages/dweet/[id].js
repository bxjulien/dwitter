import getContract from '../../utils/helpers/ethers/getContract';
import { useMetamask } from '../../components/containers/metamask/metamaskProvider';
import Dweets from '../../components/containers/dweets/Dweets'
import { useRouter } from 'next/router';

export default function Dweet() {
  const { ethereum, account, connect } = useMetamask();
  const router = useRouter();

  const { id } = router.query

  const dwitterContract = getContract(ethereum);

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Dweets contract={dwitterContract} account={account} dweetId={id} />
}