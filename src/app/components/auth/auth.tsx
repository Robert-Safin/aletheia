'use client'

import { signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const LoginButton = () => {
  return (
    <button onClick={() => signIn()}>Log in</button>
  )
}

export const LogOutButton = () => {
  return (
    <button onClick={() => signOut()}>Log out</button>
  )
}



export const RegisterButton = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/register')
  }


  return (
    <button onClick={handleClick}>Register</button>
  )
}
