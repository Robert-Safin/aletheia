import { FC, forwardRef, Ref } from "react";
import styles from './FormInput.module.css'

interface Props {
type: string
name: string
placeholder: string | undefined
}

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input ref={ref} className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder}/>
  )
})

FormInput.displayName = 'FormInput';

export default FormInput;
