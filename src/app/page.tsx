
import styles from './page.module.css'
import { NextPage } from 'next'

import useCustomServerSession from '../lib/useCustomServerSession'

import LogInLanding from '@/components/landing page/LogInLanding'



const HomePage:NextPage = async() => {
  const session = await useCustomServerSession()

  let username
  if (session) {
    username = session.user!.name
  } else {
    username = 'Guest'
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
      <h1 className={styles.title}>Aletheia</h1>
      <p className={styles.goal}>Find the best bars near you and enjoy our special deals ;</p>
      </div>
    {/* <p>Browsing as {username}</p>
    <Link href={`/home`}>Home page</Link>
    <LoginButton/>
    <LogOutButton/>
    <RegisterButton/> */}
    <LogInLanding/>



    </div>
  )
}

export default HomePage
