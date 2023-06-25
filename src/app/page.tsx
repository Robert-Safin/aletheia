
import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { NextPage } from 'next'
import LoginButton from './components/authButtons/LogInButton'
import LogOutButton from './components/authButtons/LogOutButton'
import RegisterButton from './components/authButtons/RegisterButton'
import useCustomServerSession from './lib/useCustomServerSession'
import MainHeader from './components/headers/MainHeader'
import Container from './components/containers/Container'



const HomePage:NextPage = async() => {
  const session = await useCustomServerSession()

  let username
  if (session) {
    username = session.user!.name
  } else {
    username = 'Guest'
  }

  return (
    <Container>
    <MainHeader title='Landing Page'/>
    <p>Browsing as {username}</p>

    <LoginButton/>
    <LogOutButton/>
    <RegisterButton/>
    </Container>
  )
}

export default HomePage
