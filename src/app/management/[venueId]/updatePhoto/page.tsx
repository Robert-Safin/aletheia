import Container from "@/components/containers/Container";
import { FC } from "react";
import styles from './page.module.css'
import UpdateVenuePhotoForm from "@/components/management/update photo/UpdateVenuePhotoForm";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface Props {
  params: {
    venueId: string
  }
}



const UpdateVenuePhotoPage:FC<Props> = async (props) => {

  const updateVenuePhoto = async(photoUrl:string) => {
    'use server'
    const prisma = new PrismaClient()
    const venue = await prisma.venue.update({
      where: {
        id: Number(props.params.venueId)
      },
      data: {
        mainPhoto: photoUrl
      }
    })
    console.log(venue);

    await prisma.$disconnect()
    revalidatePath(`/management/${props.params.venueId}`)
    redirect(`/management/${props.params.venueId}`)

  }
  return (
    <Container>
    <UpdateVenuePhotoForm updateVenuePhoto={updateVenuePhoto}/>
    </Container>
  )
}

export default UpdateVenuePhotoPage
