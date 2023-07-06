import { SearchQuery } from "@/app/home/page";
import { Event, PrismaClient } from "@prisma/client";




export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json() as SearchQuery

  //handle no body
  if (!body) {
    await prisma.$disconnect();
    return new Response(JSON.stringify({ message: "no body", failure: 1 }));
  }
  const latitude = body.latitude;
  const longitude = body.longitude;

  const radiusOfSearch = body.distance
  const date = body.date
  const terms = body.searchTerm


  const minLatitude = latitude - radiusOfSearch
  const maxLatitude = latitude + radiusOfSearch

  const minLongitude = longitude - radiusOfSearch
  const maxLongitude = longitude + radiusOfSearch


  const venueDocs = await prisma.venue.findMany({
    where: {
      latitude: {
        gte: minLatitude,
        lte: maxLatitude
      },
      longitude: {
        gte: minLongitude,
        lte: maxLongitude
      },
      isVerified: true
    },
    include: {
      events: {
        include: {
          venue: true,
        }
      },
      offers: {
        include: {
          venue: true,
        }
      },
    }
  })



  await prisma.$disconnect();


  if (venueDocs.length === 0) {
    return new Response(JSON.stringify({ message: "no venues found", failure: 2 }));
  }









  const data = {
    venuesNearUser: venueDocs,
  }

  return new Response(JSON.stringify({ data:data, failure: 0 }));




}
