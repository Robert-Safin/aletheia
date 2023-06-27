
interface CustomClientSession {
  data : {
    user : {
      id : string;
      name : string;
      email : string;
    } | null;
  } | null
  status : "authenticated" | "unauthenticated" | "loading"
}
