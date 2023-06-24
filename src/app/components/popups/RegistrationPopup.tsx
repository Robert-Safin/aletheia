import { FC } from "react";
import styles from './RegistrationPopup.module.css'

interface Props {
  message : string
}


const RegistrationPopup:FC<Props> = (props) => {
  return (
    <div className={styles.popup}>
      <p className={styles.message}>{props.message}</p>
    </div>
  )
}

export default RegistrationPopup
