import { Event, PrismaClient } from "@prisma/client";




export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json();

  //handle no body
  if (!body) {
    await prisma.$disconnect();
    return new Response(JSON.stringify({ message: "no body", failure: 1 }));
  }
  const latitude = body.latitude;
  const longitude = body.longitude;

  const radiusOfSearch = 0.05;

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
      events: true,
      offers: true,
      reviews: true,
    }
  })
  await prisma.$disconnect();


  if (venueDocs.length === 0) {
    return new Response(JSON.stringify({ message: "no venues found", failure: 2 }));
  }

  ///descructure data blob
  const venuesNearUser = venueDocs







  const data = {
    venuesNearUser: venuesNearUser,
  }

  return new Response(JSON.stringify({ data:data, failure: 0 }));




}
