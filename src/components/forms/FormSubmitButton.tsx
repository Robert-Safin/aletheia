import { FC } from "react"
import styles from './FormSubmitButton.module.css'

interface Props{
  title:string
  isDisabled:boolean
}

const FormSubmitButton:FC<Props> = (props) => {
  return (
    <button className={styles.button} type="submit" disabled={props.isDisabled}>{props.title}</button>
  )
}

export default FormSubmitButton
