
export interface CustomServerSession {
  user : {
    id : string
    email : string
    name : string
  } | null;
}
