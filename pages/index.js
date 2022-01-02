import { useState, useEffect } from 'react';
import Dweets from '../containers/Dweets'
import getContract from '../utils/helpers/ethers/getContract';
import getWallet from '../utils/helpers/ethers/getWallet';
import abi from '../artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwitterAddress = "0x5633283D998c85584Fdf59dC6eBbce0d483bC871";

const Home = () => {
  const [wallet, setWallet] = useState("");
  const [dwitterContract, setDwitterContract] = useState(null);

  useEffect(async () => {
    setDwitterContract(await getContract(dwitterAddress, abi.abi));
  }, []);

  useEffect(() => {
    connectWallet();
  }, [dwitterContract])

  async function connectWallet() {
    setWallet(await getWallet());
  }

  return (
    <>
      <h1>Home</h1>
      {!wallet && <button onClick={() => connectWallet()}>Connect</button>}
      <Dweets wallet={wallet} contract={dwitterContract} />
    </>
  )
}

export default Home;