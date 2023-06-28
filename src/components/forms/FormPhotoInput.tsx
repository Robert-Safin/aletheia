'use client'

import styles from './FormPhotoInput.module.css'
import {  forwardRef, Ref } from "react";

interface Props {
  type: string
  name: string
  placeholder: string | undefined
  }

  const FormPhotoInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return (
      <input ref={ref} className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder}/>
    )
  })

  FormPhotoInput.displayName = 'FormInput';

  export default FormPhotoInput;
