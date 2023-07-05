import { HomePageSearch } from "@/app/home/page";


export async function POST(request: Request) {

  const body = await request.json() as HomePageSearch
  const userLatitude = body.userLatitude
  const userLongitude = body.userLongitude
  const searchTerms = body.searchTerms
  const searchRadius = body.searchRadius
  const searchDate = body.searchDate

  return new Response(JSON.stringify({ message: "ok", failure: 0 }));




}
