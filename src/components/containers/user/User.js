import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './User.module.scss';

export default function User({ user }) {
  return (
    <section className={styles.user}>

      <div className={styles.content}>
        <div className={styles.picture}>
          <Image className={styles.image} src={`/assets/profile_pictures/${user.picture}.svg`} width={55} height={55} />
        </div>

        <div className={styles.texts}>
          <span className={styles.username}>
            {user.username}
          </span>
          <span className={styles.bio}>
            {user.bio}
          </span>
        </div>
      </div>

    </section>
  )
}