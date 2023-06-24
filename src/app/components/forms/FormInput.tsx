import { FC } from "react";
import styles from './FormInput.module.css'


interface Props {
type:string
name:string
placeholder: string | undefined
}

const FormInput:FC<Props> = (props) => {
  return (
    <input className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder}/>
  )
}

export default FormInput
