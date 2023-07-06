import styles from './LoadingSkeleton.module.css'


const LoadingSkeleton = () => {
  return (
    <div className={styles.container}>
    <div className={styles.skeleton}/>
    <div className={styles.mainHeader}/>
    <div className={styles.subHeader}/>
    <div className={styles.subHeader}/>
    </div>
  )
}


export default LoadingSkeleton;
