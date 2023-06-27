import { useSession } from "next-auth/react";



const useCustomClientSession = () => {
  const session =  useSession() as CustomClientSession;
  return session;
}

export default useCustomClientSession;
