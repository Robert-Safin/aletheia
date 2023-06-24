
import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { NextPage } from 'next'
import LoginButton from './components/authButtons/LogInButton'
import LogOutButton from './components/authButtons/LogOutButton'
import RegisterButton from './components/authButtons/RegisterButton'


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
