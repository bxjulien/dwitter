import { useState, useEffect } from 'react';
import Dweet from '../../components/dweet/Dweet';
import NoData from '../../components/noData/NoData';
import styles from './Dweets.module.scss'
import DweetForm from '../dweetForm/DweetForm';
import { useModal } from '../modal/Modal';
import Loader from '../../components/loader/Loader';

export default function Dweets({ contract, account }) {
  const { handleModal } = useModal();

  const [dweets, setDweets] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => getDweets(), []);
  useEffect(() => handleContractEvents(), [!!contract]);

  async function getDweets() {
    try {
      setIsLoading(true);
      const allDweets = await contract.getAllDweets();

      if (allDweets && allDweets.length) {
        const newDweets = [];

        let getDweetWithReplies = new Promise((resolve, reject) => {
          allDweets.forEach(async (d, index, array) => {

            let newDweet = {
              id: +d.id,
              user: d.user,
              text: d.text,
              likes: d.likes,
              timestamp: new Date(d.timestamp * 1000),
              replies: []
            }

            let replies = await contract.getReplies(newDweet.id);

            replies.forEach(r => {
              newDweet.replies.push({
                id: +r.id,
                user: r.user,
                text: r.text,
                likes: r.likes,
                timestamp: new Date(r.timestamp * 1000)
              })
            })

            newDweets.push(newDweet);

            if (index === array.length - 1) resolve();
          });
        });

        getDweetWithReplies.then(() => {
          setDweets(newDweets.reverse());
          setIsLoading(false);
          console.log("Dweets container dweets -> ", newDweets)
        });
      } else {
        setIsLoading(false);
      }

    }
    catch (e) { console.error(e); }
  }

  async function postDweet() {
    try {
      const tx = await contract.postDweet(input);
      setIsLoading(true);
      await tx.wait();
      setInput("");
    }
    catch (e) { console.error(e) }
  }

  async function deleteDweet(id) {
    try {
      const tx = await contract.deleteDweet(id);
      setIsLoading(true);
      await tx.wait();
    } catch (e) { console.error(e); }
  }

  async function likeDweet(id) {
    try {
      const tx = await contract.likeDweet(id);
      setIsLoading(true);
      await tx.wait();
    } catch (e) { console.error(e); }
  }

  async function handleReply(dweet) {
    handleModal(dweet)
  }

  function handleContractEvents() {
    contract.on("reload", async () => {
      getDweets();
    });
  }

  function render() {
    if (dweets && dweets.length > 0) {
      return (dweets.map((dweet, key) => {
        return <Dweet key={key} dweet={dweet} likeDweet={likeDweet} deleteDweet={deleteDweet} handleReply={handleReply} isMenu isBorder />
      }))
    } else return <NoData>Hmm, it seems our super decentralized database is empty... :(</NoData>
  }

  return (
    <section className={styles.dweets}>

      <DweetForm value={input} onInput={setInput} postDweet={() => postDweet()} placeholder="Quoi de neuf ?" postText="Dweet" />

      {isLoading ? <Loader /> : render()}

    </section>
  )
}