'use client'

import { signIn, signOut } from "next-auth/react"

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
