import Container from "@/components/containers/Container";
import { FC } from "react";
import styles from './page.module.css'
import UpdateVenueInformation from "@/components/management/update venue information form/UpdateVenueInformation";
interface Props {
  params: {
    venueId: string
  }
}

const UpdateVenueInformationPage:FC<Props> = async (props) => {

  return (
    <Container>
    <UpdateVenueInformation venueId={props.params.venueId}/>
    </Container>
  )
}

export default UpdateVenueInformationPage
