import { getServerSession } from "next-auth"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { CustomServerSession } from "./CustomServerSession"


const useCustomServerSession = async () => {
  const session = await getServerSession(authOptions) as CustomServerSession
  return session
}

export default useCustomServerSession
