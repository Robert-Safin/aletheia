import Container from "@/components/containers/Container";
import { FC } from "react";
import styles from './page.module.css'
import UpdateVenuePhotoForm from "@/components/management/update photo/UpdateVenuePhotoForm";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import useCustomServerSession from "@/lib/useCustomServerSession";
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
