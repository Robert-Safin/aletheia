import Container from "@/components/containers/Container";
import { FC } from "react";
import styles from './page.module.css'
interface Props {
  params: {
    venueId: string
  }
}

const UpdateVenueInformationPage:FC<Props> = async (props) => {
  return (
    <Container>
    <p>{props.params.venueId}</p>
    </Container>
  )
}

export default UpdateVenueInformationPage
