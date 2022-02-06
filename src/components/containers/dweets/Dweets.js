import { useState, useEffect } from 'react';
import Dweet from '../../common/dweet/Dweet';
import NoData from '../../common/noData/NoData';
import styles from './Dweets.module.scss'
import DweetForm from '../dweetForm/DweetForm';
import { useModal } from '../modal/Modal';
import { useUser } from '../../../context/userContext';
import Loader from '../../common/loader/Loader';
import { useRouter } from 'next/router';

export default function Dweets({ contract, account, dweetId }) {
  const { handleModal } = useModal();
  const { user } = useUser();
  const router = useRouter();

  const [dweets, setDweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReplies, setIsLoadingReplies] = useState(true);

  useEffect(() => { if (contract) dweetId ? getDweet() : getDweets() }, [contract]);
  useEffect(() => { if (contract) handleContractEvents() }, [contract]);

  async function getDweets() {
    try {
      setIsLoading(true);
      const allDweets = await contract.getAllDweets();

      if (allDweets && allDweets.length) {
        const newDweets = [];

        allDweets.forEach(d => {
          let newDweet = {
            id: +d.id,
            user: d.user,
            text: d.text,
            likes: d.likes,
            replies: +d.replies,
            timestamp: new Date(d.timestamp * 1000),
            username: d.username,
            picture: d.picture
          }

          newDweets.push(newDweet);
        });

        setDweets(newDweets.reverse());
        setIsLoading(false);
        console.log("Dweets container dweets -> ", newDweets)
      } else setIsLoading(false);
    }
    catch (e) { console.error(e); }
  }

  async function getDweet() {
    try {
      setIsLoading(true);
      const dweet = await contract.getDweet(dweetId);

      if (dweet) {
        const newDweet = {
          id: +dweet.id,
          user: dweet.user,
          text: dweet.text,
          likes: dweet.likes,
          replies: +dweet.replies,
          timestamp: new Date(dweet.timestamp * 1000),
          username: dweet.username,
          picture: dweet.picture
        }

        setDweets(newDweet);
        setIsLoading(false);
        getReplies();
      } else setIsLoading(false);
    }
    catch (e) { console.error(e); }
  }

  async function getReplies() {
    try {
      setIsLoadingReplies(true);
      const replies = await contract.getReplies(dweetId);

      if (replies && replies.length) {
        const newReplies = [];

        replies.forEach(d => {
          let newDweet = {
            id: +d.id,
            user: d.user,
            text: d.text,
            likes: d.likes,
            replies: +d.replies,
            timestamp: new Date(d.timestamp * 1000),
            username: d.username,
            picture: d.picture
          }

          newReplies.push(newDweet);
        });

        setReplies(newReplies.reverse());
        setIsLoadingReplies(false);
        console.log("Replies -> ", newReplies)
      } else setIsLoadingReplies(false);
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

  function goToDweet(id) {
    router.push(`/dweet/${id}`);
  }

  function handleContractEvents() {
    contract.on("reload", async () => {
      dweetId ? getDweet() : getDweets();
    });
  }

  function renderDweets() {
    if (dweets) {
      if (dweetId) return <Dweet dweet={dweets} likeDweet={likeDweet} deleteDweet={deleteDweet} handleReply={handleReply} routing={goToDweet} isMenu />
      else {
        return dweets.map((dweet, key) => {
          return <Dweet key={key} dweet={dweet} likeDweet={likeDweet} deleteDweet={deleteDweet} handleReply={handleReply} routing={goToDweet} isMenu isBorder />
        });
      }
    } else return <NoData>Hmm, it seems our super decentralized database is empty... :(</NoData>
  }

  function renderReplies() {
    if (replies) {
      return replies.map((reply, key) => {
        return <Dweet key={key} dweet={reply} likeDweet={likeDweet} deleteDweet={deleteDweet} handleReply={handleReply} routing={goToDweet} isMenu isBorder />
      })
    }
  }

  return (
    <section className={styles.dweets}>

      {!dweetId &&
        <DweetForm user={user} value={input} onInput={setInput} postDweet={() => postDweet()} placeholder="Quoi de neuf ?" router={router} />
      }

      {isLoading ? <Loader /> : renderDweets()}

      {dweetId && !isLoadingReplies &&
        renderReplies()
      }

    </section>
  )
}