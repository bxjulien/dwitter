import { useState, useEffect } from 'react';
import Dweet from '../../components/dweet/Dweet';
import NoData from '../../components/noData/NoData';
import styles from './Dweets.module.scss'
import DweetForm from '../dweetForm/DweetForm';
import ReplyForm from '../replyForm/ReplyForm';
import { useModal } from '../modal/Modal';

export default function Dweets({ contract, account }) {
  const { handleModal } = useModal();

  const [dweets, setDweets] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [replyDweet, setReplyDweet] = useState(null);

  useEffect(() => getDweets(), []);
  useEffect(() => handleContractEvents(), [!!contract]);

  async function getDweets() {
    try {
      setIsLoading(true);
      const _dweets = await contract.getAllDweets();

      const newDweets = [];

      let getDweetWithReplies = new Promise((resolve, reject) => {
        _dweets.forEach(async (d, index, array) => {
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

    }
    catch (e) { console.error(e); }
  }

  async function postDweet() {
    try {
      const tx = await contract.postDweet(input);
      await tx.wait();
      setInput("");
    }
    catch (e) { console.error(e) }
  }

  async function deleteDweet(id) {
    try {
      const tx = await contract.deleteDweet(id);
      await tx.wait();
    } catch (e) { console.error(e); }
  }

  async function likeDweet(id) {
    try {
      const tx = await contract.likeDweet(id);
      await tx.wait();
    } catch (e) { console.error(e); }
  }

  async function handleReply(dweet) {
    setReplyDweet(dweet);
    handleModal(dweet.text)
  }

  function handleContractEvents() {
    contract.on("reload", async () => {
      getDweets();
    });
  }

  function render() {
    if (dweets.length > 0) {
      return (dweets.map((dweet, key) => {
        return <Dweet key={key} dweet={dweet} likeDweet={likeDweet} deleteDweet={deleteDweet} handleReply={handleReply} />
      }))
    } else return <NoData>Hmm, it seems our super decentralized database is empty... :(</NoData>
  }

  return (
    <section className={styles.dweets}>

      <DweetForm value={input} onInput={setInput} postDweet={() => postDweet()} />

      {isLoading ? 'loading' : render()}

    </section>
  )
}