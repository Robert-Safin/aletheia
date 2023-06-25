
import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { NextPage } from 'next'
import LoginButton from './components/authButtons/LogInButton'
import LogOutButton from './components/authButtons/LogOutButton'
import RegisterButton from './components/authButtons/RegisterButton'
import { CustomSession } from './lib/CustomSession'
import getCurrentUserModel from './lib/getCurrentUserModel'
import customSession from './lib/getSession'





const HomePage:NextPage = async() => {
  const session = await customSession()
  const currentUser = await getCurrentUserModel(Number(session.user.id))
  console.log();


  return (
    <>
    <h1>user server session :</h1>
    <h1>{JSON.stringify(currentUser)}</h1>
    <LoginButton/>
    <LogOutButton/>
    <RegisterButton/>
    </>
  )
}

export default HomePage
