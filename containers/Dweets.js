import { useState, useEffect } from 'react';
import Dweet from '../components/Dweet';

const Dweets = ({ wallet, contract }) => {
  const [dweets, setDweets] = useState([]);

  useEffect(() => {
    wallet && getDweets();
  }, [wallet])

  async function getDweets() {
    try {
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
    }
    catch (e) { console.error(e); }
  }

  return (
    <>
      <h2>Dweet list</h2>
      {dweets.length > 0 && dweets.map((dweet, key) => {
        return <Dweet key={key} dweet={dweet} />
      })}
    </>
  )
}

export default Dweets;