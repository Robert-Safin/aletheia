import { VenueUpdateForm } from "@/components/management/update venue information form/UpdateVenueInformation";
import useCustomServerSession from "@/lib/useCustomServerSession";
import { createClient } from "@google/maps";
import { PrismaClient } from "@prisma/client";

const googleMapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY!,
});

export async function POST(request: Request) {
  const session = await useCustomServerSession();
  const body = (await request.json()) as VenueUpdateForm;
  //handle no body
  if (!body) {
    return new Response(JSON.stringify({ message: "no body", failure: 1 }));
  }
  const prisma = new PrismaClient();

  const venueId = body.venueId;
  const name = body.name;
  const category1 = body.category1;
  const category2 = body.category2;
  const category3 = body.category3;
  const phone = body.phone;
  const website = body.website;
  const about = body.about;
  const address = body.address;

  const convertAddressToCoordinates = async (
    address: string
  ): Promise<{
    latitude: number;
    longitude: number;
    formattedAddress: string;
    city: string;
  }> => {
    return new Promise((resolve, reject) => {
      googleMapsClient.geocode({ address }, (err, response) => {
        if (err) {
          reject(err);
        } else if (response.json.results.length > 0) {
          const location = response.json.results[0].geometry.location;
          const formattedAddress = response.json.results[0].formatted_address;
          const city = response.json.results[0].address_components[3].long_name;
          resolve({
            latitude: location.lat,
            longitude: location.lng,
            formattedAddress: formattedAddress,
            city: city,
          });
        } else {
          reject(new Error("Invalid address"));
        }
      });
    });
  };

  // handle empty name
  if (name.length === 0) {
    return new Response(
      JSON.stringify({ message: "Venue name can't be empty", failure: 2 })
    );
  }

  //handle name too long
  if (name.length > 30) {
    return new Response(
      JSON.stringify({
        message: "Venue name cant be longer than 30",
        failure: 3,
      })
    );
  }

  //handle long category
  if (category1.length > 20 || category2.length > 20 || category3.length > 20) {
    return new Response(
      JSON.stringify({
        message: "Venue categories cant be longer than 20",
        failure: 4,
      })
    );
  }

  //handle long about
  if (about.length > 500) {
    return new Response(
      JSON.stringify({
        message: "Venue about cant be longer than 500",
        failure: 5,
      })
    );
  }

  //handle empty about
  if (about.length === 0) {
    return new Response(
      JSON.stringify({ message: "Venue about cant be empty", failure: 6 })
    );
  }

  // handle invalid address
  let googleAddress;
  try {
    googleAddress = await convertAddressToCoordinates(address);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "invalid address", failure: 1 })
    );
  }

  //handle no session
  if (!session) {
    return new Response(JSON.stringify({ message: "No session", failure: 7 }));
  }

  const userId = session.user?.id;
  //handle no user id
  if (!userId) {
    return new Response(JSON.stringify({ message: "No user Id", failure: 8 }));
  }

  //handle user is not venue owner
  const venue = await prisma.venue.findUnique({
    where: {
      id: Number(venueId),
    },
  });
  if (venue?.ownerId !== Number(userId)) {
    return new Response(
      JSON.stringify({ message: "You are not the owner", failure: 9 })
    );
  }

  const updatedVenue = await prisma.venue.update({
    where: {
      id: Number(venueId),
    },
    data: {
      name: name,
      category1: category1,
      category2: category2,
      category3: category3,
      phoneNumber: phone,
      website: website,
      about: about,
      address: address,
      latitude: googleAddress.latitude,
      longitude: googleAddress.longitude,
      formattedAddress: googleAddress.formattedAddress,
      city: googleAddress.city,
    },
  });

  await prisma.$disconnect();

  if (!updatedVenue) {
    return new Response(
      JSON.stringify({ message: "Something went wrong :(", failure: 10 })
    );
  }

  return new Response(JSON.stringify({ message: "ok", failure: 0 }));
}
