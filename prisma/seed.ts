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
  await prisma.review.deleteMany()
  await prisma.event.deleteMany()
  await prisma.offer.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.user.deleteMany()


  // const Rob = await prisma.user.upsert({
  //   where: {email: "rob@gmail.com"},
  //   update:{},
  //   create: {
  //     email: "rob@gmail.com",
  //     name: "robertsafin",
  //     password : await hash('banana',12),
  //     isAdmin : true,
  //   }
  // })
  // console.log('created user:', Rob);




  // const John = await prisma.user.create({
  //   data: {
  //     email: "john@gmail.com",
  //     name: "bigjohn",
  //     password : await hash('pineapple',12),
  //     isAdmin : false,
  //   }
  // })
  // console.log('created user:', John);

  const Alex = await prisma.user.create({
    data: {
      email: "alex@gmail.com",
      name: "alex",
      password : await hash('watermelon',12),
      isAdmin : false,
    }
  })
  console.log('created user:', Alex);




  let OldMans = await prisma.venue.create({
    data: {
      name: "Old Mans",
      category1: "Bar",
      category2: "Restaurant",
      phoneNumber: "",
      website: "https://oldmans.net/",
      about: "Old Man's is a beer garden and surf club with sea views. It's a great place to chill out with a beer and watch the sunset. The food is good and the atmosphere is relaxed. It’s a popular place for expats and tourists alike.",
      address : 'Jl. Pantai Batu Bolong No.117X, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351',
      averageRating : 4.7,
      ownerId: Alex.id,
      mainPhoto: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687667189/Aletheia/old-mans-canggu_bj0w5f.jpg',
    }
  })
  OldMans = await prisma.venue.update({
    where: { id: OldMans.id },
    data: {
      latitude: (await convertAddressToCoordinates(OldMans.address)).latitude,
      longitude: (await convertAddressToCoordinates(OldMans.address)).longitude,
      formattedAddress: (await convertAddressToCoordinates(OldMans.address)).formattedAddress,
      city: (await convertAddressToCoordinates(OldMans.address)).city,
      isVerified : true

    },
  });

  console.log('created venue:', OldMans);




  // let WarungGouthe = await prisma.venue.create({
  //   data: {
  //     name: "Warung Gouthe",
  //     category1: "Bar",
  //     category2: "Restaurant",
  //     category3: "Surf Club",
  //     phoneNumber: "+62 812-3831-2506",
  //     website: "",
  //     about : "Warung Gouthe is a French restaurant in Canggu. It's a great place to chill out with a beer and watch the sunset. The food is good and the atmosphere is relaxed. It's a popular place for expats and tourists alike.",
  //     address : 'Jl. Pantai Berawa No.7A, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
  //     averageRating : 3.3,
  //     ownerId: Alex.id,
  //     mainPhoto: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687667181/Aletheia/bali-restaurant-must-visit-warung-gouthe-french-delicious-healthy-food-02_ghhjku.jpg'
  //   }
  // })
  // WarungGouthe = await prisma.venue.update({
  //   where: { id: WarungGouthe.id },
  //   data: {
  //     latitude: (await convertAddressToCoordinates(WarungGouthe.address)).latitude,
  //     longitude: (await convertAddressToCoordinates(WarungGouthe.address)).longitude,
  //     formattedAddress: (await convertAddressToCoordinates(WarungGouthe.address)).formattedAddress,
  //     city: (await convertAddressToCoordinates(WarungGouthe.address)).city,
  //     isVerified : true
  //   },
  // });

  // console.log('created venue:', WarungGouthe);



  // let LaCalita = await prisma.venue.create({
  //   data: {
  //     name: "La Calita",
  //     category1: "Bar",
  //     category2: "Restaurant",
  //     category3: "Surf Club",
  //     phoneNumber: "+62 812-3831-2506",
  //     website: "www.lacalitabali.com",
  //     about: "La Calita is a Mexican restaurant in Canggu. It's a great place to chill out with a beer and watch the sunset. The food is good and the atmosphere is relaxed. It's a popular place for expats and tourists alike.",
  //     address : 'Jl. Pantai Batu Bolong No.68, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
  //     averageRating : 2.4,
  //     ownerId: Alex.id,
  //     mainPhoto: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687715247/Aletheia/lacalita-mexican-bali-canggu_pelspr.jpg'
  //   }
  // })
  // LaCalita = await prisma.venue.update({
  //   where: { id: LaCalita.id },
  //   data: {
  //     latitude: (await convertAddressToCoordinates(LaCalita.address)).latitude,
  //     longitude: (await convertAddressToCoordinates(LaCalita.address)).longitude,
  //     formattedAddress: (await convertAddressToCoordinates(LaCalita.address)).formattedAddress,
  //     city: (await convertAddressToCoordinates(LaCalita.address)).city,
  //     isVerified : true
  //   },
  // });

  // console.log('created venue:', LaCalita);


  // let Kenji = await prisma.venue.create({
  //   data: {
  //     name: "Kenji (Menya Kenji) Canggu",
  //     category1: "Bar",
  //     category2: "Restaurant",
  //     phoneNumber : "+62 812-3676-0000",
  //     website: "www.kenjiramen.com",
  //     about:"Kenji is a Japanese restaurant in Canggu. It's a great place to chill out with a beer and watch the sunset. The food is good and the atmosphere is relaxed. It's a popular place for expats and tourists alike.",
  //     address : 'Jl. Pantai Berawa No.13B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
  //     averageRating : 0,
  //     ownerId: Alex.id,
  //     mainPhoto: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1687963122/Aletheia/eqxonu6fl6eo2pipvbnp.png'
  //   }
  // })
  // Kenji = await prisma.venue.update({
  //   where: { id: Kenji.id },
  //   data: {
  //     latitude: (await convertAddressToCoordinates(Kenji.address)).latitude,
  //     longitude: (await convertAddressToCoordinates(Kenji.address)).longitude,
  //     formattedAddress: (await convertAddressToCoordinates(Kenji.address)).formattedAddress,
  //     city: (await convertAddressToCoordinates(Kenji.address)).city,
  //     isVerified : true
  //   },
  // });

  // console.log('created venue:', Kenji);



  // let Culinaria1918 = await prisma.venue.create({
  //   data: {
  //     name: "1918 Culinaria (Georgian Food)",
  //     category1: "Bar",
  //     phoneNumber: "+62 812-3676-0000",
  //     about:"1918 Culinaria is a Georgian restaurant in Canggu. It's a great place to chill out with a beer and watch the sunset. The food is good and the atmosphere is relaxed. It's a popular place for expats and tourists alike.",
  //     address : 'Jl. Canggu Padang Linjong No.38a, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351',
  //     averageRating : 0,
  //     ownerId: Alex.id,
  //     mainPhoto: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1688012854/Aletheia/georgian-cuisine_slqsuh.jpg'
  //   }
  // })
  // Culinaria1918 = await prisma.venue.update({
  //   where: { id: Culinaria1918.id },
  //   data: {
  //     latitude: (await convertAddressToCoordinates(Culinaria1918.address)).latitude,
  //     longitude: (await convertAddressToCoordinates(Culinaria1918.address)).longitude,
  //     formattedAddress: (await convertAddressToCoordinates(Culinaria1918.address)).formattedAddress,
  //     city: (await convertAddressToCoordinates(Culinaria1918.address)).city,
  //     isVerified : false
  //   },
  // });

  // console.log('created venue:', Culinaria1918);


  const EventRecValid = await prisma.offer.create({
    data: {
      isRecurring: true,
      name: "Valid Recur",
      description: "Beer Pong is a drinking game in which players throw a ping pong ball across a table with the intent of landing the ball in a cup of beer on the other end.",
      startDate: new Date(2022, 5, 5),
      endDate: new Date(2025, 5, 5),
      onMonday: false,
      onTuesday: false,
      onWednesday: true,
      onThursday: false,
      onFriday: false,
      onSaturday: false,
      onSunday: false,
      startTime: "18:00",
      endTime: "22:00",
      QRQuntity: 0,
      venueId: OldMans.id,
      photo: "https://res.cloudinary.com/dxgkclowd/image/upload/v1688392878/Aletheia/event-old-mans-inernational-beerpong-competition_zjfspa.jpg",
    }
  })

  console.log('created event:', EventRecValid);


  const EventNonRecValid = await prisma.offer.create({
    data: {
      isRecurring: false,
      name: "Valid One",
      description: "2 for 1 on all skewers offered at the venue",
      startDate: new Date(2023,8,10),
      onMonday: false,
      onTuesday: false,
      onWednesday: false,
      onThursday: false,
      onFriday: false,
      onSaturday: false,
      onSunday: false,
      startTime: "08:00",
      endTime: "22:00",
      QRQuntity: 0,
      venueId: OldMans.id,
      photo: "https://res.cloudinary.com/dxgkclowd/image/upload/v1688393262/Aletheia/Warung-Gouuthe_dt5v8j.jpg"

    }
  })

  console.log('created event:', EventNonRecValid);

  const EventRecNonValid = await prisma.offer.create({
    data: {
      isRecurring: true,
      name: "Not Valid Rec",
      description: "2 for 1 on all cocktails offered at the venue",
      startDate: new Date(2022, 7, 11),
      endDate: new Date(2022, 8, 10),
      onMonday: false,
      onTuesday: false,
      onWednesday: false,
      onThursday: true,
      onFriday: false,
      onSaturday: false,
      onSunday: false,
      startTime: "20:00",
      endTime: "22:00",
      QRQuntity: 100,
      venueId: OldMans.id,
      photo: "https://res.cloudinary.com/dxgkclowd/image/upload/v1688393434/Aletheia/e14835_i5978_s3_hl6yxm.jpg"
    }
  })

  console.log('created event:', EventRecNonValid);

  const EventNonRecNonValid = await prisma.offer.create({
    data: {
      isRecurring: false,
      name: "Not Valid One",
      description: "all day everyday",

      startDate: new Date(2023,1,5),

      onMonday: false,
      onTuesday: false,
      onWednesday: false,
      onThursday: false,
      onFriday: false,
      onSaturday: false,
      onSunday: false,
      startTime: "10:00",
      endTime: "22:00",
      QRQuntity: 100,
      venueId: OldMans.id,
      photo: "https://res.cloudinary.com/dxgkclowd/image/upload/v1688644055/Aletheia/sepanjang-hari-sarapan-iklan-neon-desain-signage_cjsr5s.jpg"
    }
  })

  console.log('created event:', EventNonRecNonValid);




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
