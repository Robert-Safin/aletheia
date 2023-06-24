import { FC } from "react"
import styles from './FormSubmitButton.module.css'

interface Props{
  title:string
}

const FormSubmitButton:FC<Props> = (props) => {
  return (
    <button className={styles.button} type="submit">{props.title}</button>
  )
}

export default FormSubmitButton
