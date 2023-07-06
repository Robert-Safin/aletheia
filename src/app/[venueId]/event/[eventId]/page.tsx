import Container from "@/components/containers/Container";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    eventId: string;
  };
}

const EventShowPage: FC<Props> = (props) => {
  const { venueId, eventId } = props.params;
  return (
    <Container>
      <h1>hi mum</h1>
      <p>{venueId}</p>
      <p>{eventId}</p>
    </Container>
  );
};

export default EventShowPage;
