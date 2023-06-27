
export interface CustomServerSession {
  user : {
    id : string
    email : string
    name : string
    isVenueOwner : boolean
  } | null;
}
