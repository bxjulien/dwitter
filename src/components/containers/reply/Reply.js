import { useState } from 'react';
import styles from './Reply.module.scss'
import Dweet from '../../common/dweet/Dweet'
import DweetForm from '../dweetForm/DweetForm';
import getContract from '../../../utils/helpers/ethers/getContract';
import { useMetamask } from '../../containers/metamask/metamaskProvider';

export default function Reply({ dweet, closeModal }) {
  const { ethereum } = useMetamask();
  const contract = getContract(ethereum);
  
  const [reply, setReply] = useState('');

  async function postReply() {
    try {
      const tx = await contract.postReply(reply, dweet.id);
      await tx.wait();
      setReply('');
      closeModal();
    }
    catch (e) { console.error(e) }
  }

  return (
    <div className={styles.dweetReply}>
      <Dweet dweet={dweet} isMenu={false} isBorder={false} />
      <DweetForm value={reply} onInput={setReply} postDweet={() => postReply()} placeholder="ratio ?" postText="Reply" />
    </div>
  )
}