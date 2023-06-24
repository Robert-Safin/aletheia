
import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { NextPage } from 'next'
import { LogOutButton, LoginButton, RegisterButton } from './components/auth/auth'

const HomePage:NextPage = async() => {

  const session = await getServerSession(authOptions)
  return (
    <>
    <h1>user server session :</h1>
    <h1>{JSON.stringify(session)}</h1>
    <LoginButton/>
    <LogOutButton/>
    <RegisterButton/>
    </>
  )
}

export default HomePage
