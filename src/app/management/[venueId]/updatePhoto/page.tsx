import Container from "@/components/containers/Container";
import { FC } from "react";
import styles from './page.module.css'
import UpdateVenuePhotoForm from "@/components/management/update photo/UpdateVenuePhotoForm";
interface Props {
  params: {
    venueId: string
  }
}

const UpdateVenuePhotoPage:FC<Props> = async (props) => {
  return (
    <Container>
    <UpdateVenuePhotoForm/>
    </Container>
  )
}

export default UpdateVenuePhotoPage
