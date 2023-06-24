import { FC } from "react";
import styles from "./FormLabel.module.css"

interface Props {
  htmlFor:string
  title:string
}

const FormLabel:FC<Props> = (props) => {
  return (
    <label className={styles.label} htmlFor={props.htmlFor}>{props.title}</label>
  )
}

export default FormLabel
