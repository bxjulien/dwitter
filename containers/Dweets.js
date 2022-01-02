import { useState, useEffect } from 'react';
import Dweet from '../components/dweet/Dweet';
import NoData from '../components/noData/NoData';
import Button from '../components/button/Button';

const Dweets = ({ wallet, contract }) => {
  const [dweets, setDweets] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const noDataText = "Hmm, it seems our super decentralized database is empty... :("

  useEffect(() => {
    wallet && getDweets();
  }, [wallet])

  async function getDweets() {
    try {
      setIsLoading(true);
      const _dweets = await contract.getAllDweets();

      const newDweets = [];
      _dweets.forEach(d => {
        newDweets.push({
          id: +d.id,
          user: d.user,
          timestamp: new Date(d.timestamp * 1000),
          text: d.text
        })
      });

      setDweets(newDweets.reverse());
      setIsLoading(false);
    }
    catch (e) { console.error(e); }
  }

  async function postDweet() {
    try {
      const tx = await contract.postDweet(input);
      await tx.wait();
      setInput("");
      getDweets();
    }
    catch (e) { console.error(e) }
  }

  async function deleteDweet(id) {
    try {
      const tx = await contract.deleteDweet(id);
      await tx.wait();
      getDweets();
    } catch (e) { console.error(e); }
  }

  function renderData() {
    return (
      dweets.length > 0 ? dweets.map((dweet, key) => {
        return <Dweet key={key} dweet={dweet} deleteDweetFn={(id) => deleteDweet(id)} />
      }) : <NoData text={noDataText} />
    )
  }

  return (
    <>
      <div className="inputs">
        <input value={input} onInput={e => setInput(e.target.value)} />
        <Button text="Dweet" fn={() => postDweet()} />
      </div>
      <h2>Dweet list</h2>
      {isLoading ? 'loading' : renderData()}
    </>
  )
}

export default Dweets;