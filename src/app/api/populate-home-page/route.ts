import { createClient } from "@google/maps";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const googleMapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY!,
});

export async function POST(request: Request) {
  const body = await request.json();
  const latitude = body.latitude;
  const longitude = body.longitude;


  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY!}`
  const response = await fetch(url);
  const data = await response.json();

  const city = data.results[0].address_components[3].long_name

  // hande api failre
  if (!city) {
    return new Response(JSON.stringify({ message: "api failure", failure: 1 }));
  }


  const prisma = new PrismaClient();

  const venuesNearUser = await prisma.venue.findMany({
    where: {
      city: city
    }
  })

  if (venuesNearUser.length === 0) {
    return new Response(JSON.stringify({ message: "no venues found", failure: 2 }));
  }


  return new Response(JSON.stringify({ venuesNearUser:venuesNearUser, failure: 0 }));




}

// const getCity = googleMapsClient.reverseGeocode({latlng: [latitude, longitude],},
//     async (error, response) => {
//       if (error) {
//         return new Response(JSON.stringify({ message: "api error", failure: 1 }));
//       }
//       if (!error) {
//         const city =  response.json.results[0].address_components[2].long_name;
//         if (!city) {
//           return new Response(
//             JSON.stringify({ message: "no city name found", failure: 2 })
//           );
//         }
//         return new Response(
//           JSON.stringify({ city: city, failure: 0 })
//         );
//       }
//     }
//     );
