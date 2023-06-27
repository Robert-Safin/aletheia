import { createClient } from "@google/maps";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const googleMapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY!,
});

export async function POST(request: Request) {
  const body = await request.json();

  //handle no body
  if (!body) {
    return new Response(JSON.stringify({ message: "no body", failure: 1 }));
  }
  const latitude = body.latitude;
  const longitude = body.longitude;

  const radiusOfSearch = 0.05;

  const minLatitude = latitude - radiusOfSearch
  const maxLatitude = latitude + radiusOfSearch

  const minLongitude = longitude - radiusOfSearch
  const maxLongitude = longitude + radiusOfSearch


  const venuesNearUser = await prisma.venue.findMany({
    where: {
      latitude: {
        gte: minLatitude,
        lte: maxLatitude
      },
      longitude: {
        gte: minLongitude,
        lte: maxLongitude
      }
    }
  })
  prisma.$disconnect();


  if (venuesNearUser.length === 0) {
    return new Response(JSON.stringify({ message: "no venues found", failure: 2 }));
  }


  return new Response(JSON.stringify({ venuesNearUser:venuesNearUser, failure: 0 }));




}
