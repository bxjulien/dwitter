import { useState } from 'react';
import styles from './Reply.module.scss'
import Dweet from '../../common/dweet/Dweet'
import DweetForm from '../dweetForm/DweetForm';
import { useMetamask } from '../../../context/metamaskContext';

export default function Reply({ dweet, user, closeModal }) {
  const { contracts } = useMetamask();

  const [reply, setReply] = useState('');

  async function postReply() {
    try {
      const tx = await contracts.dwitter.postReply(reply, dweet.id);
      await tx.wait();
      setReply('');
      closeModal();
    }
    catch (e) { console.error(e) }
  }

  return (
    <div className={styles.dweetReply}>
      <Dweet dweet={dweet} routing isMenu />
      <DweetForm value={reply} user={user} onInput={setReply} postDweet={() => postReply()} placeholder="ratio ?" postText="Reply" />
    </div>
  )
}