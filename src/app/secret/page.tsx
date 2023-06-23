import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"


const ProtectedPage = async() => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }
  return (
    <>
    <p>protected</p>
    </>
  )
}

export default ProtectedPage
