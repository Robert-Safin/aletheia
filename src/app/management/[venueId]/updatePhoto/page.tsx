import Container from "@/components/containers/Container";
import { FC } from "react";
import styles from './page.module.css'
import UpdateVenuePhotoForm, { MyFile } from "@/components/management/update photo/UpdateVenuePhotoForm";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import useCustomServerSession from "@/lib/useCustomServerSession";

import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET
});

interface Props {
  params: {
    venueId: string
  }
}

const validateUserIsVenueOwner = async (venueId:string, userId:string) => {
  const prisma = new PrismaClient()
  const venue = await prisma.venue.findUnique({
    where: {
      id: Number(venueId)
    }
  })
  await prisma.$disconnect()
  if(venue?.ownerId !== Number(userId)) {
   return false
  } else {
    return true
  }

}

const getVenuePhotos = async(venueId:number) => {
  const prisma = new PrismaClient()
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId
    },
    include: {
      photos: true
    }
  })

  return venue!.photos


}



const UpdateVenuePhotoPage:FC<Props> = async (props) => {
  const session = await useCustomServerSession()

  if(!session.user) {
    redirect('/')
  }

  const userId = session.user.id

  const userIsVenueOwner = await validateUserIsVenueOwner(props.params.venueId, userId)



  if(!userIsVenueOwner) {
    return <p>Not Authorized</p>
  }




  const updateVenuePhotos = async(photos: { url: string; public_id: string }[]) => {
    'use server'
    const prisma = new PrismaClient()

    // Delete old photos from cloudinary
    const oldPhotos = await getVenuePhotos(Number(props.params.venueId))
    for (let oldPhoto of oldPhotos) {
      await cloudinary.v2.uploader.destroy(oldPhoto.publicId);
    }

    // Delete old photos from database
    await prisma.photo.deleteMany({
      where: {
        venueId: Number(props.params.venueId)
      }
    })

    // Create new photos in database
    await prisma.photo.createMany({
      data: photos.map(photo => {
        return {
          url: photo.url,
          publicId: photo.public_id,
          venueId: Number(props.params.venueId)
        }
      })
    })

    await prisma.$disconnect()




    revalidatePath(`/management/${props.params.venueId}`)
    redirect(`/management/${props.params.venueId}`)
  }



  return (
    <Container bgcolor="#262626">
    <UpdateVenuePhotoForm updateVenuePhotos={updateVenuePhotos}/>
    </Container>
  )
}

export default UpdateVenuePhotoPage
