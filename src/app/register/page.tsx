'use client'
import { PrismaClient } from "@prisma/client";
import styles from "./page.module.css";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import FormLabel from "../../components/forms/FormLabel";
import FormInput from "../../components/forms/FormInput";
import FormSubmitButton from "../../components/forms/FormSubmitButton";
import { FormEvent, useRef, useState } from "react";
import RegistrationPopup from "../../components/popups/ErrorPopup";

export interface UserRegistrationForm {
  email: string
  username: string
  password: string
  confirmPassword: string
}

const RegistrationForm = () => {

  const emailRef= useRef<HTMLInputElement>(null);
  const usernameRef= useRef<HTMLInputElement>(null);
  const passwordRef= useRef<HTMLInputElement>(null);
  const confirmPasswordRef= useRef<HTMLInputElement>(null);

  const [formIsSubmitted, setFormIsSubmitted] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')


  const handleSubmit = async(event:FormEvent) => {
    event.preventDefault()
    setFormIsSubmitted(true)
    const formData:UserRegistrationForm = {
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      confirmPassword: confirmPasswordRef.current!.value
    }
    const response = await fetch('api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const serverResponse = await response.json()
    const serverFailure = serverResponse.failure
    const serverMessage = serverResponse.message

    if (serverFailure >= 1) {
      setFormIsSubmitted(false)
      setPopup(true)
      setTimeout(() => {
        setPopup(false)
      }, 2000);
      setPopupMessage(serverMessage)
    }



  }

  return (
    <>
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormLabel htmlFor="email" title="Email" />
      <FormInput type="email" name="email" placeholder="bob@things.com" ref={emailRef}/>

      <FormLabel htmlFor="username" title="Username" />
      <FormInput type="username" name="username" placeholder="username" ref={usernameRef}/>

      <FormLabel htmlFor="password" title="Password" />
      <FormInput type="password" name="password" placeholder={undefined} ref={passwordRef}/>

      <FormLabel htmlFor="confirm password" title="Confirm Password" />
      <FormInput type="password" name="confirm password" placeholder={undefined} ref={confirmPasswordRef}/>

      <FormSubmitButton isDisabled={formIsSubmitted} title={formIsSubmitted ? 'Loading' : 'Register'} />
    </form>

    {popup && <RegistrationPopup message={popupMessage}/>}
    </>
  );
};

export default RegistrationForm;
