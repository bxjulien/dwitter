import Dweets from '../components/containers/dweets/Dweets'
import getContract from '../utils/helpers/ethers/getContract';
import { useMetamask } from '../context/metamaskContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { ethereum, account, connect } = useMetamask();
  const [contract, setContract] = useState(null);

  useEffect(() => { if (ethereum) setContract(getContract(ethereum, 'Dwitter')) }, [ethereum])

  if (!ethereum) return <p>Please install Metamask to connect to this site</p>
  else if (!account) return <p>Connect with Metamask</p>
  else return <Dweets contract={contract} account={account} />
}
