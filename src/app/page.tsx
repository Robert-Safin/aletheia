
import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { NextPage } from 'next'

const HomePage:NextPage = async() => {

  const session = await getServerSession(authOptions)
  console.log(session);
  return (
    <>
    <h1>{JSON.stringify(session)}</h1>
    </>
  )
}

export default HomePage
