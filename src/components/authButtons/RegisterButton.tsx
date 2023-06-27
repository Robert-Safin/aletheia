'use client'
import { useRouter } from "next/navigation"
import styles from './authButtons.module.css'



const RegisterButton = () => {

  const router = useRouter()
  const handleClick = () => {
    router.push('/register')
  }


  return (
    <button className={styles.button} onClick={handleClick}>Register</button>
  )
}

export default RegisterButton
