import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './User.module.scss';

export default function User({ user }) {

  return (
    <section className={styles.user}>

      hi {user.username}
      <Image className={styles.image} src={`/assets/profile_pictures/${user.picture}.svg`} width={35} height={35} />
      bio : {user.bio}

    </section>
  )
}