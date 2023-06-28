import { FC } from "react";
import styles from './ErrorPopup.module.css'

interface Props {
  message : string
}


const ErrorPopup:FC<Props> = (props) => {
  return (
    <div className={styles.popup}>
      <p className={styles.message}>{props.message}</p>
    </div>
  )
}

export default ErrorPopup
