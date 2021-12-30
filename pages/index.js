import { useState, useEffect } from 'react';
import Dwitter from '../artifacts/contracts/Dwitter.sol/Dwitter.json'
import Dweet from '../components/Dweet';
import getContract from '../utils/ethers/getContract';
import getWallet from '../utils/ethers/getWallet';
import abi from '../artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwitterAddress = "0xe32412ed42Fd10bB8b6fd3D219103Fe904d1E8B0";

const Home = () => {
  const [wallet, setWallet] = useState("");
  const [dweets, setDweets] = useState([]);
  const [input, setInput] = useState("");
  const [dwitterContract, setDwitterContract] = useState(null);

  useEffect(async () => {
    setDwitterContract(getContract(dwitterAddress, abi.abi));
  }, [])

  async function getDweets() {
    try {
      const _dweets = await dwitterContract.getAllDweets();

      const newDweets = [];
      _dweets.forEach(d => {
        newDweets.push({
          id: +d.id,
          user: d.user,
          timestamp: new Date(d.timestamp * 1000),
          text: d.text
        })
      });

      console.log(newDweets)

      setDweets(newDweets.reverse());
    }
    catch (e) { console.error(e); }
  }

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
      {wallet && <button onClick={() => getDweets()}>Get dweets</button>}
      <div className="inputs">
        <input value={input} onInput={e => setInput(e.target.value)} />
        <button onClick={postDweet}>
          Dweet
        </button>
      </div>
      {dweets.length > 0 && dweets.map((dweet, key) => {
        return <Dweet key={key} dweet={dweet} />
      })}
    </>
  )
}

export default Home;