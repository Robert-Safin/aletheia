'use client'
import { signOut } from "next-auth/react"
import styles from './authButtons.module.css'

const LogOutButton = () => {

  return (
    <button className={styles.button} onClick={() => signOut()}>Log out</button>
  )
}


export default LogOutButton
