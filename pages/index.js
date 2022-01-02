import { useState, useEffect } from 'react';
import Dwitter from '../artifacts/contracts/Dwitter.sol/Dwitter.json'
import Dweets from '../containers/Dweets'
import getContract from '../utils/helpers/ethers/getContract';
import getWallet from '../utils/helpers/ethers/getWallet';
import abi from '../artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwitterAddress = "0xe32412ed42Fd10bB8b6fd3D219103Fe904d1E8B0";

const Home = () => {
  const [wallet, setWallet] = useState("");
  const [input, setInput] = useState("");
  const [dwitterContract, setDwitterContract] = useState(null);

  useEffect(async () => {
    setDwitterContract(getContract(dwitterAddress, abi.abi));
  }, [])


  async function postDweet() {
    try {
      const tx = await dwitterContract.postDweet(input);
      await tx.wait();
      setInput("");
      getDweets();
    }
    catch (e) { console.error(e) }
  }

  async function connectWallet() {
    try {
      setWallet(getWallet());
    } catch (e) { console.error(e); }
  }

  return (
    <>
      <h1>Home</h1>
      {!wallet && <button onClick={() => connectWallet()}>Connect</button>}
      <div className="inputs">
        <input value={input} onInput={e => setInput(e.target.value)} />
        <button onClick={postDweet}>
          Dweet
        </button>
      </div>
      <Dweets wallet={wallet} contract={dwitterContract} />
    </>
  )
}

export default Home;