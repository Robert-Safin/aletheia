import { PrismaClient } from "@prisma/client";
import { SearchQuery } from "@/app/home/page";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json() as SearchQuery

  // handle no body
  if (!body) {
    await prisma.$disconnect();
    return new Response(JSON.stringify({ message: "no body", failure: 1 }));
  }
  const { latitude, longitude, distance, date, searchTerm } = body;

  const minLatitude = latitude - distance;
  const maxLatitude = latitude + distance;

  const minLongitude = longitude - distance;
  const maxLongitude = longitude + distance;

  // Clean the DB before querying
  const currentDate = new Date();

  await prisma.event.deleteMany({
    where: {
      OR: [
        {
          isRecurring: false,
          startDate: {
            lt: currentDate
          }
        },
        {
          isRecurring: true,
          endDate: {
            lt: currentDate
          }
        }
      ]
    }
  });

  const venueDocsNearUser = await prisma.venue.findMany({
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
        where: {
          OR: [
            {
              isRecurring: false,
              startDate: {
                gte: currentDate
              }
            },
            {
              isRecurring: true,
              endDate: {
                gte: currentDate
              }
            }
          ]
        },
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
  });

  if (venueDocsNearUser.length === 0) {
    await prisma.$disconnect();
    return new Response(JSON.stringify({ message: "no venues found", failure: 2 }));
  }

  const data = {
    venuesNearUser: venueDocsNearUser,
  }

  await prisma.$disconnect();
  return new Response(JSON.stringify({ data: data, failure: 0 }));
}
