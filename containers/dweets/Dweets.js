import { useState, useEffect } from 'react';
import Dweet from '../../components/dweet/Dweet';
import NoData from '../../components/noData/NoData';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './Dweets.module.css'

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
          text: d.text,
          likes: d.likes,
          timestamp: new Date(d.timestamp * 1000),
        })
      });

      console.log("Dweets container dweets -> ", newDweets)
      setDweets(newDweets.reverse());
      setIsLoading(false);
    }
    catch (e) { console.error(e); }
  }

/*   async function getDweet(id) {
    const dweet = await contract.getDweet(id);



  } */

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

  async function likeDweet(id) {
    try {
      const tx = await contract.likeDweet(id);
      await tx.wait();
      getDweets();
    } catch (e) { console.error(e); }
  }

  function render() {
    return (
      dweets.length > 0 ? dweets.map((dweet, key) => {
        return <Dweet key={key} dweet={dweet} likeDweet={likeDweet} deleteDweet={deleteDweet} />
      }) : <NoData text={noDataText} />
    )
  }

  return (
    <section className="flex-column">
      <div className="flex-column">
        <Input value={input} onInput={setInput} />
        <Button text="Dweet" fn={() => postDweet()} />
      </div>
      <h2>Dweet list</h2>
      {isLoading ? 'loading' : render()}
    </section>
  )
}

export default Dweets;