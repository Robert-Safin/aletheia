'use client'
import { signIn } from "next-auth/react"
import styles from './authButtons.module.css'

const LoginButton = () => {
  return (
    <button className={styles.button} onClick={() => signIn()}>Log in</button>
  )
}

export default LoginButton
