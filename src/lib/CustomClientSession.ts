
interface CustomClientSession {
  data : {
    user : {
      id : string;
      name : string;
      email : string;
      isVenueOwner : boolean;
    } | null;
  } | null
  status : "authenticated" | "unauthenticated" | "loading"
}
