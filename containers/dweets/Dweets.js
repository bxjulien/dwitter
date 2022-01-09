import { useState, useEffect } from 'react';
import Dweet from '../../components/dweet/Dweet';
import NoData from '../../components/noData/NoData';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './Dweets.module.scss'
import DweetForm from '../dweetForm/DweetForm';

export default function Dweets({ contract, account }) {
  const [dweets, setDweets] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => getDweets(), [])

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
      }) : <NoData>Hmm, it seems our super decentralized database is empty... :(</NoData>
    )
  }

  return (
    <section className={styles.dweets}>
      <DweetForm value={input} onInput={setInput} postDweet={() => postDweet()} />

      {isLoading ? 'loading' : render()}

    </section>
  )
}