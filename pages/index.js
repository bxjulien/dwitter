import { useState, useEffect } from 'react';
import Dweets from '../containers/dweets/Dweets'
import getContract from '../utils/helpers/ethers/getContract';
import getWallet from '../utils/helpers/ethers/getWallet';
import abi from '../artifacts/contracts/Dwitter.sol/Dwitter.json'
import Button from '../components/button/Button';

const dwitterAddress = "0xC4fe37348CE23f9Db147359735a06b5F6aEaAce6";

const Home = () => {
  const [wallet, setWallet] = useState("");
  const [dwitterContract, setDwitterContract] = useState(null);

  useEffect(async () => {
    setDwitterContract(await getContract(dwitterAddress, abi.abi));
    connectWallet();
  }, []);

  async function connectWallet() {
    setWallet(await getWallet());
  }

  return (
    <>
      <h1>Home</h1>
      {!wallet && <Button text={'Connect'} fn={connectWallet} />}
      <Dweets wallet={wallet} contract={dwitterContract} />
    </>
  )
}

export default Home;