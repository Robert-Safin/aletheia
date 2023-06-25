import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { CustomSession } from "./CustomSession"



const customSession = async () => {
  const session = await getServerSession(authOptions) as CustomSession
  return session
}

export default customSession
