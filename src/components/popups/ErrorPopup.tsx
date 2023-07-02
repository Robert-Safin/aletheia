import { FC } from "react";
import styles from './ErrorPopup.module.css'
import { PiWarningCircleBold } from "react-icons/pi";

interface Props {
  message : string
}


const ErrorPopup:FC<Props> = (props) => {
  return (
    <div className={styles.popup}>
      <PiWarningCircleBold className={styles.icon}/>
      <p className={styles.message}>{props.message}</p>
    </div>
  )
}

export default ErrorPopup
