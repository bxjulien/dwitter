import { useState } from 'react';
import styles from './Icon.module.scss';

export default function Icon({ onClickFn, info, tooltip, icon }) {
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  return (
    <div className={styles.container} onClick={() => { if (onClickFn) onClickFn() }}>
      <div className={styles.content}
        onMouseEnter={() => setIsTooltipActive(true)}
        onMouseLeave={() => setIsTooltipActive(false)}>
        <span className={styles.icon}>
          {icon}
        </span>
        {
          info &&
          <span className={styles.info}>
            {info}
          </span>
        }
        {tooltip && isTooltipActive &&
          <span className={styles.tooltip}>{tooltip}</span>
        }
      </div>
    </div>
  )
}