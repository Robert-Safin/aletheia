import { createClient } from "@google/maps";
import { PrismaClient } from "@prisma/client";
import {hash} from 'bcrypt'

const prisma = new PrismaClient()

const googleMapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY!,
});

export const convertAddressToCoordinates = async (address: string): Promise<{latitude: number, longitude: number, formattedAddress:string, city:string}> => {
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
          city: city
        });
      } else {
        reject(new Error('No results found'));
      }
    });
  });
}


async function main() {
  await prisma.venue.deleteMany()
  await prisma.user.deleteMany()


  const Rob = await prisma.user.upsert({
    where: {email: "rob@gmail.com"},
    update:{},
    create: {
      email: "rob@gmail.com",
      name: "robertsafin",
      password : await hash('banana',12)
    }
  })
  console.log('created user:', Rob);




  const John = await prisma.user.create({
    data: {
      email: "john@gmail.com",
      name: "bigjohn",
      password : await hash('pineapple',12)
    }
  })
  console.log('created user:', John);

  const Alex = await prisma.user.create({
    data: {
      email: "alex@gmail.com",
      name: "alex",
      password : await hash('watermelon',12)
    }
  })
  console.log('created user:', Alex);




  let OldMans = await prisma.venue.create({
    data: {
      name: "Old Mans",
      categories : 'bar,restaurant',
      address : 'Jl. Pantai Batu Bolong No.117X, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351',
      averageRating : 3,
      ownerId: John.id,
      photo: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687667189/Aletheia/old-mans-canggu_bj0w5f.jpg',
    }
  })
  OldMans = await prisma.venue.update({
    where: { id: OldMans.id },
    data: {
      latitude: (await convertAddressToCoordinates(OldMans.address)).latitude,
      longitude: (await convertAddressToCoordinates(OldMans.address)).longitude,
      formattedAddress: (await convertAddressToCoordinates(OldMans.address)).formattedAddress,
      city: (await convertAddressToCoordinates(OldMans.address)).city

    },
  });

  console.log('created venue:', OldMans);




  let WarungGouthe = await prisma.venue.create({
    data: {
      name: "Warung Gouthe",
      categories : 'warung,restaurant',
      address : 'Jl. Pantai Berawa No.7A, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
      averageRating : 0,
      ownerId: Alex.id,
      photo: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687667181/Aletheia/bali-restaurant-must-visit-warung-gouthe-french-delicious-healthy-food-02_ghhjku.jpg'
    }
  })
  WarungGouthe = await prisma.venue.update({
    where: { id: WarungGouthe.id },
    data: {
      latitude: (await convertAddressToCoordinates(WarungGouthe.address)).latitude,
      longitude: (await convertAddressToCoordinates(WarungGouthe.address)).longitude,
      formattedAddress: (await convertAddressToCoordinates(WarungGouthe.address)).formattedAddress,
      city: (await convertAddressToCoordinates(WarungGouthe.address)).city
    },
  });

  console.log('created venue:', WarungGouthe);



  let LaCalita = await prisma.venue.create({
    data: {
      name: "La Calita",
      categories : 'Mexican,restaurant',
      address : 'Jl. Pantai Batu Bolong No.68, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
      averageRating : 5,
      ownerId: Alex.id,
      photo: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687715247/Aletheia/lacalita-mexican-bali-canggu_pelspr.jpg'
    }
  })
  LaCalita = await prisma.venue.update({
    where: { id: LaCalita.id },
    data: {
      latitude: (await convertAddressToCoordinates(LaCalita.address)).latitude,
      longitude: (await convertAddressToCoordinates(LaCalita.address)).longitude,
      formattedAddress: (await convertAddressToCoordinates(LaCalita.address)).formattedAddress,
      city: (await convertAddressToCoordinates(LaCalita.address)).city
    },
  });

  console.log('created venue:', LaCalita);




}











main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
