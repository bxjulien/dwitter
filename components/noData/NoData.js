import styles from './NoData.module.css'

export default function NoData(props) {

  return <div className={styles.noData} {...props}>{props.children}</div>
}

