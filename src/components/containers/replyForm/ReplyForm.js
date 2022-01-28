import styles from './ReplyForm.module.scss';

export default function ReplyForm({ replyDweet }) {
  return (
    <div className={styles.reply}>
      {replyDweet.text}
    </div>
  )
}